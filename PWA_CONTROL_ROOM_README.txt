ASPIQUEST CONTROL ROOM — PWA INSTALL

Perubahan ini hanya menambahkan kemampuan install untuk admin.html / Control Room.
Halaman siswa tidak diberi manifest, tombol install, atau start_url aplikasi.

CARA UPLOAD
1. Backup repository GitHub yang sekarang.
2. Upload/replace admin.html dan service-worker.js.
3. Tambahkan control-room.webmanifest ke root repository.
4. Tambahkan assets/aspiquest-control-192.png dan assets/aspiquest-control-512.png.
5. Pastikan semua file tetap di lokasi/folder tersebut.
6. Buka URL admin.html melalui HTTPS (GitHub Pages/Vercel/hosting HTTPS).
7. Login seperti biasa. Di Chrome/Edge, tekan tombol "Install" di header Control Room.
   Jika belum muncul, buka menu browser dan pilih Install app / Add to Home Screen.

PENTING
- Tidak ada perubahan SQL, tabel, RPC, Edge Function, atau Supabase secrets.
- Aplikasi tetap memakai Supabase yang sama untuk login dan sinkronisasi data.
- Install PWA tidak membuat database baru dan tidak memerlukan bolak-balik dashboard Supabase.
- Notifikasi push tetap bergantung pada konfigurasi VAPID dan Edge Function yang sudah ada.
- PWA tidak membuat Control Room offline penuh. Data live membutuhkan internet dan Supabase.
- Browser hanya menampilkan prompt install jika syarat PWA/HTTPS terpenuhi.
- service-worker.js masih menangani push yang sudah ada; tambahan cache hanya untuk shell statis
  dan tidak menyimpan respons API/auth Supabase.
- Pada iPhone/iPad, gunakan Safari > Share > Add to Home Screen.
