-- Aspiquest redeem + notification preflight (safe to inspect before running)
-- Run only after reviewing your existing ASPIQUEST_V2_MIGRATION.sql.
-- Does not disable RLS and does not expose service-role credentials.

insert into public.redeem_settings (id, is_open, starts_at, ends_at)
values (1, false, null, null)
on conflict (id) do nothing;

-- Verify required objects and current redeem window:
select to_regclass('public.rewards') as rewards_table,
       to_regclass('public.redemptions') as redemptions_table,
       to_regclass('public.redeem_settings') as redeem_settings_table,
       to_regclass('public.push_subscriptions') as push_subscriptions_table,
       to_regclass('public.point_transactions') as point_transactions_table;

select id, is_open, starts_at, ends_at from public.redeem_settings where id=1;
select name, points_cost, stock, active, description from public.rewards order by points_cost, name;

-- Important: the app's request_reward_redemption RPC is the authoritative transaction.
-- It validates the open period and stock, locks rows, deducts points and stock,
-- creates a redemption, and records a point transaction atomically.
-- Do not deduct points in frontend JavaScript and do not disable RLS.
