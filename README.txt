ASPIROOM V10 — SUPABASE LIVE + DIALOG GUIDE

1. Do NOT rerun the original schema if tables already exist.
2. If you saw ERROR 42P07 relation "profiles" already exists, the main schema is already there.
3. Run SUPABASE_SETUP_SAFE.sql ONCE. It only creates the PK Inti username-login helper.
4. PK Inti login accepts the actual Supabase admin email directly, OR username PKINTI after the profile username is set.
5. Email provider must be ON. For this school pilot, turn OFF Confirm email so new synthetic student accounts can log in immediately.
6. Realtime requires profiles and submissions to be in supabase_realtime publication; the original schema already included this.
7. Never put a Supabase secret/service-role key in frontend code.

Files:
- index.html — landing + login/register
- student.html — Mission Hub + dialog guide + missions + submit + confetti + waving ending
- admin.html — PK Inti live Control Room
- app.js — Supabase client, auth, questions, realtime
- SUPABASE_SETUP_SAFE.sql — safe patch for an already-created schema
- assets/guide-boy.png + guide-girl.png — guide character visuals


V16 REVISION: mobile-friendly guide widget, functional close button, smaller top-positioned guide, realistic Santa Angela student visuals, and Serviam branding on all pages.
