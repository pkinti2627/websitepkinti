-- ASPIROOM V10 — SAFE SUPABASE PATCH
-- JANGAN jalankan ulang schema utama jika tabel sudah ada.
-- Error 42P07 relation "profiles" already exists = schema utama SUDAH ada.
-- File ini hanya membuat helper login PK Inti.

create or replace function public.get_pk_admin_email(identifier text)
returns text
language sql
security definer
set search_path = public
as $$
  select u.email
  from auth.users u
  join public.profiles p on p.id = u.id
  where lower(trim(p.username)) = lower(trim(identifier))
    and p.role = 'pk_admin'
  limit 1;
$$;

grant execute on function public.get_pk_admin_email(text) to anon, authenticated;

-- CEK admin yang sudah ada:
select id, username, role
from public.profiles
where role = 'pk_admin';

-- Kalau username admin masih kosong, ganti YOUR-ADMIN-UID dengan UID admin:
-- update public.profiles
-- set username = 'PKINTI', role = 'pk_admin'
-- where id = 'YOUR-ADMIN-UID';
