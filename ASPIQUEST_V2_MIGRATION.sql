-- ASPIQUEST 2.0 MIGRATION
-- Run manually in Supabase SQL Editor after reviewing. This migration does not delete existing data.
-- IMPORTANT: do not put service_role keys in frontend files.

-- Align base mission points. Existing trigger award_submission_points() is updated below.
update public.missions set points=5 where upper(code) in ('OSIS','PK');
update public.missions set points=10 where upper(code)='SEKOLAH';
alter table public.profiles alter column points type numeric(10,2) using points::numeric;
alter table public.submissions alter column points_awarded type numeric(10,2) using points_awarded::numeric;

create table if not exists public.point_transactions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 amount numeric(10,2) not null,
 description text not null,
 submission_id uuid null references public.submissions(id) on delete set null,
 redemption_id uuid null,
 created_at timestamptz not null default now()
);

create table if not exists public.rewards (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 description text not null default '',
 points_cost integer not null check(points_cost > 0),
 stock integer not null default 0 check(stock >= 0),
 is_mystery boolean not null default false,
 active boolean not null default true,
 created_at timestamptz not null default now()
);

create table if not exists public.redemptions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 reward_id uuid not null references public.rewards(id),
 points_spent integer not null check(points_spent > 0),
 status text not null default 'pending' check(status in ('pending','approved','ready','completed','rejected')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
alter table public.point_transactions add column if not exists redemption_id uuid null references public.redemptions(id) on delete set null;

create table if not exists public.redeem_settings (
 id integer primary key check(id=1),
 starts_at timestamptz,
 ends_at timestamptz,
 is_open boolean not null default false,
 updated_by uuid references public.profiles(id),
 updated_at timestamptz not null default now()
);
insert into public.redeem_settings(id,is_open) values(1,false) on conflict(id) do nothing;

create table if not exists public.aspiration_feedback (
 id uuid primary key default gen_random_uuid(),
 submission_id uuid not null references public.submissions(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade,
 admin_id uuid not null references public.profiles(id),
 message text not null,
 status text not null default 'Diterima',
 created_at timestamptz not null default now()
);

create table if not exists public.push_subscriptions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.profiles(id) on delete cascade,
 endpoint text not null unique,
 subscription jsonb not null,
 created_at timestamptz not null default now()
);

alter table public.point_transactions enable row level security;
alter table public.rewards enable row level security;
alter table public.redemptions enable row level security;
alter table public.redeem_settings enable row level security;
alter table public.aspiration_feedback enable row level security;
alter table public.push_subscriptions enable row level security;

-- Drop only policies with these exact names, making this patch rerunnable.
drop policy if exists "students read own point transactions" on public.point_transactions;
drop policy if exists "admins read all point transactions" on public.point_transactions;
drop policy if exists "students read active rewards" on public.rewards;
drop policy if exists "admins manage rewards" on public.rewards;
drop policy if exists "students read own redemptions" on public.redemptions;
drop policy if exists "admins manage redemptions" on public.redemptions;
drop policy if exists "students read redeem settings" on public.redeem_settings;
drop policy if exists "admins manage redeem settings" on public.redeem_settings;
drop policy if exists "students read own feedback" on public.aspiration_feedback;
drop policy if exists "admins manage feedback" on public.aspiration_feedback;
drop policy if exists "users manage own push subscriptions" on public.push_subscriptions;
drop policy if exists "pk admins manage push subscriptions" on public.push_subscriptions;
drop policy if exists "admins read push subscriptions" on public.push_subscriptions;

create policy "students read own point transactions" on public.point_transactions for select to authenticated using(user_id=auth.uid());
create policy "admins read all point transactions" on public.point_transactions for select to authenticated using(public.is_pk_admin());
create policy "students read active rewards" on public.rewards for select to authenticated using(active=true or public.is_pk_admin());
create policy "admins manage rewards" on public.rewards for all to authenticated using(public.is_pk_admin()) with check(public.is_pk_admin());
create policy "students read own redemptions" on public.redemptions for select to authenticated using(user_id=auth.uid() or public.is_pk_admin());
create policy "admins manage redemptions" on public.redemptions for update to authenticated using(public.is_pk_admin()) with check(public.is_pk_admin());
create policy "students read redeem settings" on public.redeem_settings for select to authenticated using(true);
create policy "admins manage redeem settings" on public.redeem_settings for all to authenticated using(public.is_pk_admin()) with check(public.is_pk_admin());
create policy "students read own feedback" on public.aspiration_feedback for select to authenticated using(student_id=auth.uid() or public.is_pk_admin());
create policy "admins manage feedback" on public.aspiration_feedback for insert to authenticated with check(public.is_pk_admin() and admin_id=auth.uid());
create policy "pk admins manage push subscriptions" on public.push_subscriptions for all to authenticated using(public.is_pk_admin() and user_id=auth.uid()) with check(public.is_pk_admin() and user_id=auth.uid());
create policy "admins read push subscriptions" on public.push_subscriptions for select to authenticated using(public.is_pk_admin());

-- Replace the existing trigger function so each of the 3 free-response areas is counted:
-- the two text questions in the mission plus Kritik & Saran. One qualifying answer = 1/3 points.
create or replace function public.award_submission_points()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
declare
 base_points numeric(10,2);
 qualifying integer := 0;
 response_item jsonb;
 answer_text text;
 words integer;
begin
 select points into base_points from public.missions where id=new.mission_id;
 base_points := coalesce(base_points,0);
 if jsonb_typeof(new.answers->'responses')='array' then
   for response_item in select value from jsonb_array_elements(new.answers->'responses') loop
     if coalesce(response_item->>'type','')='text' then
       answer_text := trim(coalesce(response_item->>'answer',''));
       words := case when answer_text='' then 0 else cardinality(regexp_split_to_array(answer_text,'\s+')) end;
       if words >= 75 then qualifying := qualifying + 1; end if;
     end if;
   end loop;
 end if;
 answer_text := trim(coalesce(new.answers->>'critique',''));
 words := case when answer_text='' then 0 else cardinality(regexp_split_to_array(answer_text,'\s+')) end;
 if words >= 75 then qualifying := qualifying + 1; end if;
 if jsonb_typeof(new.answers->'responses')='array' then
   for response_item in select value from jsonb_array_elements(new.answers->'responses') loop
     if coalesce(response_item->>'type','')='text' then
       answer_text := trim(coalesce(response_item->>'answer',''));
       words := case when answer_text='' then 0 else cardinality(regexp_split_to_array(answer_text,'\\s+')) end;
       if words > 150 then raise exception 'Setiap jawaban mandiri maksimal 150 kata.'; end if;
     end if;
   end loop;
 end if;
 answer_text := trim(coalesce(new.answers->>'critique',''));
 words := case when answer_text='' then 0 else cardinality(regexp_split_to_array(answer_text,'\\s+')) end;
 if words > 150 then raise exception 'Kritik & Saran maksimal 150 kata.'; end if;
 new.points_awarded := round(base_points * least(qualifying,3)::numeric / 3, 2);
 return new;
end;
$$;

create or replace function public.apply_submission_points()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
 update public.profiles set points=coalesce(points,0)+coalesce(new.points_awarded,0) where id=new.user_id;
 insert into public.point_transactions(user_id,amount,description,submission_id)
 values(new.user_id,coalesce(new.points_awarded,0),'Poin aspirasi '||coalesce((select code from public.missions where id=new.mission_id),'misi'),new.id);
 return new;
end;
$$;

do $$ declare t record; begin
 for t in select tgname from pg_trigger where tgrelid='public.submissions'::regclass and not tgisinternal and tgfoid in (select oid from pg_proc where proname in ('award_submission_points','apply_submission_points')) loop
   execute format('drop trigger if exists %I on public.submissions',t.tgname);
 end loop;
 create trigger award_submission_points_v2 before insert on public.submissions for each row execute function public.award_submission_points();
 create trigger apply_submission_points_v2 after insert on public.submissions for each row execute function public.apply_submission_points();
end $$;

create or replace function public.request_reward_redemption(p_reward_id uuid)
returns uuid
language plpgsql
security definer
set search_path=public
as $$
declare
 uid uuid := auth.uid();
 rw public.rewards%rowtype;
 setting public.redeem_settings%rowtype;
 redemption_id uuid;
 current_points numeric;
begin
 if uid is null then raise exception 'Silakan login terlebih dahulu.'; end if;
 select * into setting from public.redeem_settings where id=1;
 if not coalesce(setting.is_open,false) or (setting.starts_at is not null and now()<setting.starts_at) or (setting.ends_at is not null and now()>setting.ends_at) then raise exception 'Periode redeem sedang ditutup.'; end if;
 select * into rw from public.rewards where id=p_reward_id and active=true for update;
 if not found then raise exception 'Hadiah tidak tersedia.'; end if;
 if rw.stock<=0 then raise exception 'Stok hadiah habis.'; end if;
 select points into current_points from public.profiles where id=uid for update;
 if coalesce(current_points,0)<rw.points_cost then raise exception 'Poin belum mencukupi.'; end if;
 update public.profiles set points=points-rw.points_cost where id=uid;
 update public.rewards set stock=stock-1 where id=rw.id;
 insert into public.redemptions(user_id,reward_id,points_spent) values(uid,rw.id,rw.points_cost) returning id into redemption_id;
 insert into public.point_transactions(user_id,amount,description,redemption_id) values(uid,-rw.points_cost,'Redeem hadiah: '||case when rw.is_mystery then 'Mystery Reward' else rw.name end,redemption_id);
 return redemption_id;
end;
$$;
grant execute on function public.request_reward_redemption(uuid) to authenticated;

-- Enable realtime for the new tables if not already published.
do $$ begin
 if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='redemptions') then alter publication supabase_realtime add table public.redemptions; end if;
 if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='aspiration_feedback') then alter publication supabase_realtime add table public.aspiration_feedback; end if;
end $$;

-- Seed starter catalog; adjust stock to actual school budget before opening redeem.
create unique index if not exists rewards_name_cost_mystery_uidx on public.rewards(name,points_cost,is_mystery);
insert into public.rewards(name,description,points_cost,stock,is_mystery,active) values
 ('Pensil','Alat tulis untuk kegiatan sekolah',50,0,false,true),
 ('Pulpen','Alat tulis untuk kegiatan sekolah',50,0,false,true),
 ('Penghapus','Alat tulis untuk kegiatan sekolah',50,0,false,true),
 ('Marker','Untuk menandai materi',75,0,false,true),
 ('Stabilo','Untuk menandai materi',75,0,false,true),
 ('Aksesori tutup pensil','Aksesori alat tulis',100,0,false,true),
 ('Notes','Buku catatan kecil',150,0,false,true),
 ('Dompet koin','Dompet kecil',200,0,false,true),
 ('Tempat pensil','Penyimpanan alat tulis',200,0,false,true),
 ('Kipas mini / lampu belajar','Pilih salah satu sesuai stok',350,0,false,true),
 ('Mystery Reward','Hadiah eksklusif misteri',350,0,true,true)
 on conflict do nothing;

create or replace function public.admin_update_redemption_status(p_redemption_id uuid,p_status text)
returns void language plpgsql security definer set search_path=public as $$
declare r public.redemptions%rowtype; rw public.rewards%rowtype;
begin
 if not public.is_pk_admin() then raise exception 'Hanya PK Inti yang dapat memproses redeem.'; end if;
 if p_status not in ('pending','approved','ready','completed','rejected') then raise exception 'Status tidak valid.'; end if;
 select * into r from public.redemptions where id=p_redemption_id for update;
 if not found then raise exception 'Permintaan redeem tidak ditemukan.'; end if;
 if r.status='rejected' and p_status<>'rejected' then raise exception 'Redeem yang ditolak tidak dapat dibuka kembali; siswa harus mengajukan ulang.'; end if;
 if p_status='rejected' and r.status<>'rejected' then
   update public.profiles set points=coalesce(points,0)+r.points_spent where id=r.user_id;
   update public.rewards set stock=stock+1 where id=r.reward_id;
   insert into public.point_transactions(user_id,amount,description,redemption_id) values(r.user_id,r.points_spent,'Pengembalian poin karena redeem ditolak',r.id);
 end if;
 update public.redemptions set status=p_status,updated_at=now() where id=p_redemption_id;
end $$;
grant execute on function public.admin_update_redemption_status(uuid,text) to authenticated;

-- Account deletion is deliberately handled by a protected Edge Function using server-side service role.
