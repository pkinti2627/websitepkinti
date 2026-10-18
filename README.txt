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
- supabase/functions/profile-security/index.ts: username changes, email OTP verification, and password changes secured by email OTP
- ASPIQUEST_FIXES_MIGRATION.sql: profile/avatar fields, avatar storage policies, verified email OTP table, and fixed reward tiers

DEPLOY ORDER
1. Make a backup of the current GitHub repository and keep the current live version until tests pass.
2. In Supabase Dashboard > SQL Editor, inspect ASPIQUEST_V2_MIGRATION.sql and run it once if not already applied. Then inspect and run ASPIQUEST_FIXES_MIGRATION.sql. The second migration is designed as an additive follow-up; it does not delete student accounts or submissions.
3. Update the rewards stock values in Control Room before opening a redeem period. Seed rewards start with stock 0 intentionally so the site does not promise gifts before the school confirms inventory.
4. Deploy the contents of this ZIP to the GitHub Pages repository root (keep the assets/ folder and service-worker.js at the root).
5. Deploy Supabase Edge Functions:
   supabase functions deploy admin-delete-student
   supabase functions deploy push-redeem-notification
   supabase functions deploy profile-security
6. Configure Edge Function secrets in Supabase (never commit these values):
   SUPABASE_URL
   SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   VAPID_PUBLIC_KEY
   VAPID_PRIVATE_KEY
   VAPID_SUBJECT (for example a school-owned mailto address)
   RESEND_API_KEY
   RESEND_FROM (a sender address verified with Resend)
7. The VAPID public key is already set in app.js. Copy the matching private key from the separate setup-only file into the Supabase Edge Function secret VAPID_PRIVATE_KEY. Set VAPID_PUBLIC_KEY to the public key already shown in app.js, plus VAPID_SUBJECT. Never upload the private-key setup file to GitHub.
8. Open the site over HTTPS, sign in as each PK Inti account, and tap “:3 → Aktifkan Notifikasi” on each device. Each member needs to grant browser notification permission.
9. To make email-verified password changes work, configure Resend and deploy profile-security. Students must add and verify a recovery email in Profile & Security first. Username changes use the same Edge Function so username login continues working. Avatar uploads need the avatars bucket created by the follow-up SQL.
10. Test with a test student and test reward before using real student accounts.

FEATURES INCLUDED IN THIS PACKAGE
- Aspiroom branding changed to Aspiquest.
- OSIS +5 points, PK +5 points, Sekolah +10 points.
- Three long-answer areas are counted for proportional points: two free-response questions plus Kritik & Saran. Each response reaching 75 words earns one-third of the mission points; points are stored to two decimal places. Each free response is capped at 150 words. Responses under 75 words can still be submitted and earn no credit for that response.
- Poin Saya and point transaction history.
- Fixed agreed reward catalog (pencil, pen, eraser, marker, highlighter, pencil-cap accessory, notes, coin purse, pencil case, mini fan/study lamp); PK Inti edits stock and descriptions, not names or point prices.
- Redeem is hidden unless the period is opened by PK Inti.
- Student redeem requests, balance deduction, stock decrement, and transaction record are handled by a database RPC.
- PK Inti can manage the redeem window, rewards and stock, statuses, student feedback, and student account deletion (through the Edge Function).
- Push notifications target profiles with role pk_admin that have enabled notifications on their devices.

IMPORTANT IMPLEMENTATION NOTES
- The school needs to decide whether the 150-word limit applies to each free-response field (this package currently applies it to each of the three long-answer fields).
- The current starter catalog uses the agreed point tiers. Confirm actual inventory/budget and enter stock quantities before opening redeem.
- The push notification feature needs the VAPID configuration and Edge Functions above; it cannot send notifications until these steps are completed.
- Test point award trigger behavior and current RLS policies on a staging/test project before live deployment, especially if the existing Supabase schema has been customized.

FOLLOW-UP UI NOTES
- The catalog is opened from the top-right :3 menu in both Student Space and Control Room. It auto-scrolls slowly and uses matching local SVG item illustrations.
- Redeem window controls remain in Control Room; the catalog menu can be viewed while closed, but redeem buttons only appear when the period is active.
- Account deletion requires the deployed admin-delete-student Edge Function and SUPABASE_SERVICE_ROLE_KEY secret. If it is not deployed, the interface now reports the backend error instead of silently failing.
- Push cannot send until VAPID keys are generated, the public key is set in app.js, and private key/subject secrets are set in Supabase. Never put VAPID private key in GitHub.

VAPID PRIVATE KEY SAFETY
- The VAPID public key is already configured in app.js. The matching private key is supplied separately as ASPIQUEST_VAPID_PRIVATE_KEY_SETUP_ONLY.txt for the owner to copy into Supabase Edge Function secret VAPID_PRIVATE_KEY.
- Do NOT upload that private-key text file or paste the private key into app.js/GitHub. Keep it in a password manager or delete the local copy after setting the Supabase secret.
- The push button still requires Edge Functions deployed and Supabase secrets configured.
