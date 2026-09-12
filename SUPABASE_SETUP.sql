-- ASPIROOM LIVE: optional patch for username-based PK Inti login
-- Run this once in Supabase SQL Editor after the main schema.

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

-- If your PK admin profile does not yet have the username PKINTI,
-- set it from the Authentication > Users UID:
-- update public.profiles set username = 'PKINTI', role = 'pk_admin' where id = 'YOUR-UID';
