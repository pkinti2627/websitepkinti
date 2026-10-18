-- Aspiquest follow-up fixes: profile settings, verified recovery email, avatar storage, fixed reward list.
-- Review first; safe to run after ASPIQUEST_V2_MIGRATION.sql. Does not delete student accounts or submissions.
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists recovery_email text;
alter table public.profiles add column if not exists recovery_email_verified boolean not null default false;

create table if not exists public.profile_email_otps (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 email text not null,
 purpose text not null check (purpose in ('verify_email','change_password')),
 code_hash text not null,
 expires_at timestamptz not null,
 attempts integer not null default 0,
 created_at timestamptz not null default now()
);
alter table public.profile_email_otps enable row level security;
-- No client policies: only the profile-security Edge Function service role can read/write OTPs.

-- Public avatar bucket; uploads are scoped to the authenticated user's own folder.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('avatars','avatars',true,2097152,array['image/png','image/jpeg','image/webp','image/gif'])
on conflict(id) do update set public=true,file_size_limit=2097152,allowed_mime_types=array['image/png','image/jpeg','image/webp','image/gif'];
drop policy if exists "Aspiquest users upload own avatar" on storage.objects;
drop policy if exists "Aspiquest users update own avatar" on storage.objects;
drop policy if exists "Aspiquest users read public avatars" on storage.objects;
create policy "Aspiquest users upload own avatar" on storage.objects for insert to authenticated with check(bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "Aspiquest users update own avatar" on storage.objects for update to authenticated using(bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text) with check(bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "Aspiquest users read public avatars" on storage.objects for select to public using(bucket_id='avatars');

-- Only the agreed fixed rewards are shown; no Mystery Reward placeholder or user-created reward.
update public.rewards set active=false where lower(name)='mystery reward';
-- Normalize the agreed point tiers for the fixed items.
update public.rewards set points_cost=50,active=true where lower(name) in ('pensil','pulpen','penghapus');
update public.rewards set points_cost=75,active=true where lower(name) in ('marker','stabilo');
update public.rewards set points_cost=100,active=true where lower(name)='aksesori tutup pensil';
update public.rewards set points_cost=150,active=true where lower(name)='notes';
update public.rewards set points_cost=200,active=true where lower(name) in ('dompet koin','tempat pensil');
update public.rewards set points_cost=350,active=true where lower(name) in ('kipas mini / lampu belajar','kipas mini','lampu belajar');
