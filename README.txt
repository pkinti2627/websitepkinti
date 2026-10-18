ASPIQUEST 2.0 — GITHUB PAGES + SUPABASE
======================================

IMPORTANT
- This ZIP is a prepared code package. It does NOT change your live GitHub Pages site or Supabase database automatically.
- Review and run ASPIQUEST_V2_MIGRATION.sql in Supabase SQL Editor before deploying the new frontend.
- Existing user/submission data is not intentionally deleted by the migration. Account deletion is only available through the protected Edge Function.
- Never place SUPABASE_SERVICE_ROLE_KEY or VAPID_PRIVATE_KEY in app.js or any public GitHub file.

CONTENTS
- index.html, student.html, admin.html, app.js: Aspiquest frontend
- assets/: Serviam logo and student guide artwork
- ASPIQUEST_V2_MIGRATION.sql: points, reward catalog, redeem, transactions, feedback, RLS, redemption RPCs
- service-worker.js: browser push notification handler
- supabase/functions/admin-delete-student/index.ts: protected PK Inti account deletion
- supabase/functions/push-redeem-notification/index.ts: send redeem push notification to subscribed PK Inti devices

DEPLOY ORDER
1. Make a backup of the current GitHub repository and keep the current live version until tests pass.
2. In Supabase Dashboard > SQL Editor, inspect ASPIQUEST_V2_MIGRATION.sql and run it once. If the project schema has been customized, check the trigger and column names before running.
3. Update the rewards stock values in Control Room before opening a redeem period. Seed rewards start with stock 0 intentionally so the site does not promise gifts before the school confirms inventory.
4. Deploy the contents of this ZIP to the GitHub Pages repository root (keep the assets/ folder and service-worker.js at the root).
5. Deploy Supabase Edge Functions:
   supabase functions deploy admin-delete-student
   supabase functions deploy push-redeem-notification
6. Configure Edge Function secrets in Supabase (never commit these values):
   SUPABASE_URL
   SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   VAPID_PUBLIC_KEY
   VAPID_PRIVATE_KEY
   VAPID_SUBJECT (for example a school-owned mailto address)
7. Generate a VAPID key pair using a trusted local environment with web-push installed, for example: npx web-push generate-vapid-keys. Put the PUBLIC key in the VAPID_PUBLIC_KEY constant near the top of app.js and set both keys as Supabase Edge Function secrets. Do not publish the private key.
8. Open the site over HTTPS, sign in as each PK Inti account, and tap “Aktifkan Notifikasi” on each device. Each member needs to grant browser notification permission.
9. Test with a test student and test reward before using real student accounts.

FEATURES INCLUDED IN THIS PACKAGE
- Aspiroom branding changed to Aspiquest.
- OSIS +5 points, PK +5 points, Sekolah +10 points.
- Three long-answer areas are counted for proportional points: two free-response questions plus Kritik & Saran. Each response reaching 75 words earns one-third of the mission points; points are stored to two decimal places. Each free response is capped at 150 words. Responses under 75 words can still be submitted and earn no credit for that response.
- Poin Saya and point transaction history.
- Regular and mystery reward catalog; initial stock is 0 until set by PK Inti.
- Redeem is hidden unless the period is opened by PK Inti.
- Student redeem requests, balance deduction, stock decrement, and transaction record are handled by a database RPC.
- PK Inti can manage the redeem window, rewards and stock, statuses, student feedback, and student account deletion (through the Edge Function).
- Push notifications target profiles with role pk_admin that have enabled notifications on their devices.

IMPORTANT IMPLEMENTATION NOTES
- The school needs to decide whether the 150-word limit applies to each free-response field (this package currently applies it to each of the three long-answer fields).
- The current starter catalog uses the agreed point tiers. Confirm actual inventory/budget and enter stock quantities before opening redeem.
- The push notification feature needs the VAPID configuration and Edge Functions above; it cannot send notifications until these steps are completed.
- Test point award trigger behavior and current RLS policies on a staging/test project before live deployment, especially if the existing Supabase schema has been customized.
