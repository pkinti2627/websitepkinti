# Aspiquest 2.0 — Status paket revisi

## Yang sudah disiapkan dalam paket
- UI Student Space dan Control Room, Serviam branding, tutorial portraits, katalog fixed reward, pengaturan stok/deskripsi/periode, riwayat poin/redeem, feedback, dan account-management interface.
- SQL migration untuk reward/redemption/point transactions/feedback/push subscriptions dan profile security fields/OTP/avatar storage.
- Edge Functions untuk profile-security, admin-delete-student, dan push-redeem-notification.
- Perbaikan fallback pembacaan profil: `loadMe()` membaca profil yang tersedia, sehingga kolom `avatar_url` yang belum ada tidak langsung mematahkan proses login.
- Perbaikan tampilan poin nol di Control Room agar tidak salah jatuh ke poin maksimum misi, serta tampilan poin desimal.
- Reward catalog tetap berupa daftar tetap; Mystery Reward dinonaktifkan di migration fixes dan tidak ditampilkan sebagai hadiah aktif di pengelolaan stok.
- SQL guard untuk mencegah perubahan status setelah redeem selesai.

## Yang belum bisa diklaim sudah live
- Migrasi SQL belum dijalankan pada database pengguna.
- Edge Functions belum dibuktikan ter-deploy pada project yang dipakai.
- Email OTP butuh secret Resend dan sender terverifikasi.
- Push membutuhkan VAPID public/private key berpasangan, secret server, subscription tiap perangkat, dan tes perangkat nyata.
- Hapus akun, redeem/refund, dan perhitungan poin perlu dites dengan akun uji sebelum dipakai siswa.

`node --check app.js` lolos. Ini bukan pengganti tes integrasi live.
