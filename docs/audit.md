# Audit lokal — 1 Oktober 2026

## Perbaikan

- Route kecil, section terpisah sesuai alur, data terpusat, CSS dipisah per bagian melalui satu CSS Module.
- 63 file starter yang tidak dipakai dan 14 dependensi UI langsung dihapus. Aset lama dipertahankan; arsip deployment dipisahkan.
- Tanggal cover tahun 2025 diperbaiki ke 26 Desember 2026 jam 07.00 WIB. Countdown dan kalender mengikuti data acara.
- Catatan RSVP tetap ada saat mengedit; input dibatasi panjangnya; error diumumkan ke pembaca layar.
- Pemilih tamu memakai disclosure/radio native dengan akses Tab, arrow keys, dan Escape.
- Status RSVP/Wishes diperjelas sebagai prototipe lokal, belum pengiriman ke mempelai.
- Sanitasi ucapan menghapus script/style dan markup, mempertahankan alfanumerik Unicode, membatasi 150 karakter, serta menangani storage rusak tanpa crash.
- Penghapusan seluruh localStorage juga memperbarui UI; like tetap tanpa counter.
- Heading utama, nama section, dan teks warna dresscode ditambahkan untuk aksesibilitas.
- Scroll cue menghormati reduced motion dan fokus keyboard. Penanda menu mengikuti section yang benar.
- Reveal berulang bekerja pada konten tinggi dan merespons perubahan reduced motion saat halaman terbuka.
- Clamp nama diperbaiki; offset pembuka menyesuaikan tinggi layar; alamat dan kata panjang dapat membungkus.
- Gambar bawah layar memakai lazy loading, decoding async, dan dimensi eksplisit.
- Loading musik dapat dibatalkan tanpa pesan kegagalan palsu.
- Kontrol kalender/maps, copy, dan like memiliki area sentuh minimum 44px. Jika clipboard ditolak, tersedia input untuk salin manual.

## Dependensi

React/React DOM/React Server DOM: 19.2.8. Vite: 8.0.16. Override image-size: 2.0.3. Wrangler, plugin Cloudflare, dan tipe Workers diselaraskan. Tidak memakai `--force` atau `--legacy-peer-deps`.

Audit npm setelah pembaruan: **0 kerentanan yang diketahui** pada dependency tree terpasang. Ini bukan jaminan bebas semua masalah keamanan.

Referensi: [React Server Components](https://github.com/advisories/GHSA-wx67-qw84-cm4g), [Vite Windows](https://github.com/advisories/GHSA-fx2h-pf6j-xcff), [image-size](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq).

## Sebelum go-live

1. Backend RSVP/Wishes: database, validasi server, token undangan, rate limit, satu ucapan per undangan, akses admin, dan retensi data tamu. Integrasi ini sebelumnya ditunda pemilik.
2. Finalisasi foto, kutipan, keluarga, contact person, sosial. Verifikasi nama, rekening, alamat, dan lisensi font/foto/musik.
3. Konfirmasi jam selesai: kalender 13.00, resepsi tertulis 13.00.
4. Uji Safari/iOS dan Chrome Android fisik, koneksi lambat, storage diblokir, izin clipboard. Emulasi bukan pengganti perangkat fisik.
5. Build produksi dan preview hosting sebelum deployment. Audit ini mengikuti instruksi tidak menjalankan build/deploy otomatis.
6. Domain/HTTPS, social preview, pemantauan error, serta backup setelah backend tersedia. Credential tidak boleh berada di `public/` atau source client.

## Validasi

Perintah ulang: `npm run check` dan `npm audit`. Tujuh unit test menguji WIB/UTC, countdown, sanitasi, batas panjang, storage rusak, dan normalisasi teks.

Browser lokal sudah memeriksa cover → undangan, delapan item menu, validasi RSVP, pemilih tamu via keyboard, retensi catatan saat mengedit, validasi/sanitasi ucapan, toggle like, serta status salin rekening berhasil. Musik terverifikasi memuat audio (`readyState = 4`), waktu pemutaran bertambah, loop aktif, dan bisa dijeda. Reveal Journey terverifikasi berubah `visible → ready → visible` setelah keluar dan kembali ke viewport; jadwal juga tampil saat masuk viewport.

Tampilan mobile 390px, layar kecil 320px, dan desktop 1440px diperiksa; pemeriksaan lebar DOM pada 320px/1440px tidak menemukan overflow horizontal. Semua pemeriksaan TypeScript, lint, format, serta tujuh unit test lolos. Tidak ada formulir yang dikirim ke layanan eksternal.

Jalur clipboard ditolak, perubahan reduced motion pada sistem operasi, Safari, dan perangkat ponsel fisik belum diuji interaktif. Pengujian build/hosting produksi belum dilakukan.

Console browser pengujian mencatat hydration warning dengan selisih atribut `katalonextensionid` pada `<html>`, serta pesan channel ekstensi tertutup. Diff tersebut menunjukkan modifikasi DOM oleh ekstensi Katalon. Tidak ditambahkan `suppressHydrationWarning` untuk menyembunyikannya; lakukan pemeriksaan browser tanpa ekstensi untuk membedakan gangguan ekstensi dari masalah aplikasi.
