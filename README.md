# Undangan Pernikahan Verdo & Intan

React + TypeScript + vinext (App Router di atas Vite). Pengembangan dilakukan di lokal; deployment hanya atas permintaan pemilik proyek.

## Menjalankan proyek

Node.js >= 22.13 dan npm diperlukan. Pengujian terakhir memakai Node.js 24.

```powershell
npm.cmd ci
npm.cmd run dev
```

Buka **http://127.0.0.1:3001** atau **http://localhost:3001**. Server memakai alamat IPv4 secara eksplisit agar kedua URL membuka aplikasi yang sama. Port 3001 dipilih karena port 3000 dipakai aplikasi lain di komputer pengembangan. Jika port 3001 terpakai, ikuti URL **Local** yang tercetak di terminal. Di macOS/Linux gunakan `npm` tanpa `.cmd`.

```powershell
npm.cmd run check    # TypeScript, lint, unit test, format
npm.cmd run format   # Format seluruh source yang dipelihara
npm.cmd test         # Pengujian fungsi waktu dan validasi data
```

`npm run build` membuat bundle produksi. `npm start` memerlukan hasil build dan menjalankan preview Wrangler, bukan dev server. Build/deploy tidak dijalankan otomatis untuk perubahan lokal.

Untuk uji coba nama tamu di cover, simpan `INVITATION_GUESTS` sebagai objek JSON di `.env.local` dengan kode acak 32 karakter heksadesimal sebagai key dan nama tamu sebagai value. Jalankan ulang dev server dan buka `/i/<kode>` dengan 22 karakter Base64URL dari 16 byte yang sama. Link lama `/?i=<kode-heksadesimal>` tetap berlaku. Kode kosong, tidak dikenal, atau berulang menampilkan `Tamu Undangan`. Simpan pemetaan di konfigurasi server dan jangan masukkan daftar tamu ke Git.

## Struktur sesuai alur halaman

```text
app/
  layout.tsx                 Metadata dan font
  globals.css                Reset dan gaya global
  page.tsx                   Route / → cover
  undangan/page.tsx          Route /undangan → invitation
features/
  cover/                     Halaman Buka Undangan + CSS
  invitation/
    invitation-page.tsx      Komposisi halaman sesuai urutan tampil
    data/                    Acara, mempelai, rekening, musik
    components/              Judul, foto dummy, copy, reveal, scroll
    navigation/              Hamburger menu
    music/                   Pemutar musik
    lib/                     Fungsi waktu dan navigasi
    sections/
      01-opening/            Pembuka
      02-introduction/       Kutipan
      03-couple/             The Bride & The Groom
      04-journey/            Journey of Love
      05-schedule/           Save the Date, acara, dresscode, countdown
      06-moments/            Our Moment
      07-rsvp/               Formulir kehadiran
      08-wishes/             Formulir, validasi, penyimpanan ucapan
      09-gift/               Rekening dan alamat kado
      10-thanks/             Penutup dan atribusi musik
    styles/                  CSS sesuai urutan section + responsif
public/                      Aset publik
tests/                       Unit test menggunakan node:test
docs/audit.md                Audit dan pekerjaan sebelum go-live
```

## Lokasi perubahan

| Kebutuhan                               | File/folder                                                      |
| --------------------------------------- | ---------------------------------------------------------------- |
| Nama, tanggal, tempat, cerita, rekening | `features/invitation/data/wedding.ts`                            |
| Urutan section                          | `features/invitation/invitation-page.tsx`                        |
| Menu dan label                          | `features/invitation/navigation/invitation-menu.tsx`             |
| Cover                                   | `features/cover/cover.module.css`                                |
| Ukuran nama di kanan                    | `features/invitation/styles/01-opening.css` → `.coupleLockup`    |
| Foto/detail mempelai                    | `features/invitation/styles/03-couple.css`                       |
| Kartu cerita                            | `features/invitation/styles/04-journey.css`                      |
| Foto Our Moment                         | `features/invitation/data/gallery.ts` dan `public/images/prewed` |
| RSVP dan ucapan                         | `features/invitation/sections/07-rsvp` dan `08-wishes`           |
| Musik dan volume                        | `features/invitation/data/music.ts`                              |
| Responsif/animasi bersama               | `features/invitation/styles/11-motion-responsive.css`            |

CSS section diimpor melalui **satu** `invitation.module.css`. Vite menggabungkan `@import` sebelum CSS Modules memberi scope, sehingga selector lintas-section konsisten. Jangan mengimpor partial CSS langsung dari komponen. Aksen tema diatur secara global di `app/globals.css`: `--accent: #996633`, `--accent-rgb: 153 102 51` untuk efek transparan, dan `--on-accent` untuk teks di atas latar aksen. Palet latar undangan berada di `styles/00-base.css`.

## Status fitur

- RSVP masih di memori halaman. Reload menghapus jawaban; belum dikirim ke server.
- Wishes memakai `localStorage`, key `verdo-intan:wish-submission:v1`, hanya terlihat pada browser/origin yang sama.
- Batas satu ucapan berlaku per browser, bukan identitas undangan. Backend/token/rate limiting masih perlu dibuat sebelum go-live.
- Sanitasi client bukan pengganti validasi server. Ucapan selalu dirender sebagai teks React, bukan HTML.
- Tombol sosial sengaja nonaktif. Foto, kutipan pengantar, identitas keluarga, dan contact person perlu konten final.
- Kalender mengikuti permintaan **08.00–13.00 WIB**, tetapi resepsi tertulis **11.00–13.00 WIB**. Perbedaan ini perlu konfirmasi sebelum go-live.

## Aset dan hosting

`public/audio`, `public/fonts`, `public/images`, `public/videos`, dan `public/placeholders` berisi aset aktif. `public/hero-background.mp4`, kelopak, dan `public/journey` adalah aset desain lama yang tetap disimpan, tidak dimuat halaman sekarang. `images/` lokal berisi desain sumber, bukan URL publik.

Background halaman `/undangan` diatur oleh `components/invitation-background.tsx` dan `invitation-background.module.css`. Satu layer fixed tetap diam saat halaman digulir: penuh pada mobile, hanya panel kanan pada desktop. Tinggi `100lvh` menutupi viewport terbesar agar perubahan toolbar browser mobile tidak meninggalkan celah di bawah video. Lebar layer dan kolom kanan memakai variabel CSS yang sama, `--invitation-width`. Sumber terbaru adalah `images/BackgroundForWeb/Prewed 3.mp4`; versi publik `invitation-prewed3-480.mp4` dan `invitation-prewed3-720.mp4` memakai H.264 24 fps tanpa audio, dengan pita hitam dihapus dan MP4 fast start. Durasi penuh sekitar 124 detik dipertahankan. Versi 480 piksel sekitar 5,5 MB dipakai hingga lebar layar 36rem, sedangkan versi 720 piksel sekitar 10,2 MB dipakai pada layar lebih besar. Resolusi dipilih sekali saat mulai agar rotasi layar tidak mengunduh video lain. `object-fit: cover` menjaga rasio gambar sambil mengisi layar, dengan crop terpusat sesuai proporsi perangkat.

Cover sebelum membuka undangan memakai foto `images/BackgroundForWeb/P1640490.png` melalui versi WebP `public/images/backgrounds/identity-panel.webp`. Cover dibatasi kolom tengah maksimum `30rem` (480px), termasuk di desktop; area kiri/kanan memakai foto yang sama dengan blur. Lebar kolom (`--cover-width`), blur, dan posisi tombol musik cover diatur di `features/cover/cover.module.css`. Cover tidak menampilkan atau mengunduh video. Setelah undangan dibuka, video diputar berulang, dimuat setelah render awal, dijeda ketika tab tersembunyi, dan dilepas saat komponen ditutup. Preferensi reduced motion atau mode hemat data memakai poster WebP tanpa mengunduh video. Poster juga menjadi cadangan saat pemutaran gagal atau autoplay diblokir. Semua section transparan; overlay hanya berada pada layer video, diatur melalui `--video-overlay` (default `0.55`). Kartu dan form mempertahankan permukaannya sendiri agar konten tetap terbaca.

`lib/load-video-source.ts` memeriksa dukungan HTTP Range dengan satu byte. Hosting yang mendukungnya memakai URL video langsung. Jika hosting mengembalikan file penuh (HTTP 200), respons yang sama digunakan sebagai Blob URL agar seek dan sinkronisasi tetap bekerja; file tidak diunduh dua kali. Poster ditampilkan selama file tersebut dimuat. Unduhan dibatalkan saat tab tersembunyi, dan Blob URL dilepas saat video ditutup atau mode hemat data/reduced motion diaktifkan.

Foto asli Our Moment berada di `images/Prewed`. Galeri memuat salinan WebP di `public/images/prewed` dengan thumbnail 360 dan 720 piksel; browser memilih ukuran sesuai layar dan zoom. Versi `-large.webp` untuk lightbox memiliki sisi terpanjang hingga 1920 piksel dan hanya dimuat saat foto dibuka. Urutan foto, teks alternatif, dimensi, dan titik fokus foto diatur di `data/gallery.ts`. Galeri menyusun dua foto per baris dengan tinggi sejajar dan lebar sesuai rasio masing-masing, dengan jarak horizontal dan vertikal yang sama (6-10 piksel mengikuti layar). Jarak ini diatur melalui `--gallery-gap` di `styles/06-moments.css`. Ukuran bingkai mengikuti rasio asli, sedangkan isinya di-zoom agar subjek lebih jelas. Atur `focus.x` dan `focus.y` (0–100 persen) untuk jangkar zoom, serta `focus.zoom` (`1` untuk frame utuh, lebih besar untuk mendekatkan subjek). Nilai ini ditentukan per foto, bukan deteksi objek otomatis. CSS `overflow: hidden` membatasi crop di dalam bingkai; file gambar asli tidak diubah.

Klik foto Our Moment untuk membuka lightbox dengan foto utuh, overlay gelap 80%, dan blur tipis. Tombol panah, tombol keyboard kiri/kanan, serta geser horizontal pada ponsel berpindah foto dan berulang dari akhir ke awal. Tutup dengan tombol silang, Escape, atau klik area overlay. Dialog native menjaga fokus keyboard, mengunci scroll halaman selama terbuka, lalu mengembalikan fokus dan posisi halaman ketika ditutup. Transisi 200 ms mengikuti preferensi reduced motion. Foto besar yang gagal dimuat memakai thumbnail 720 piksel sebagai cadangan. Galeri di belakang tetap dalam susunan yang sama.

Urutan `galleryPhotos` diacak satu kali saat foto disiapkan dan tetap stabil selama interaksi. Properti `source` mencatat foto asli; nama aset WebP memuat hash konten agar foto yang diperbarui tidak tertukar dengan cache lama. `large.width` dan `large.height` mencatat dimensi foto lightbox. Komponen dan gaya lightbox berada di `sections/06-moments/moment-lightbox.tsx` serta `moment-lightbox.module.css`; susunan thumbnail berada di `moment-gallery.tsx` dan `styles/06-moments.css`.

Arsip deployment lama disimpan di `.local-archive/deployments/`, di luar pelacakan Git. `.tmp`, `node_modules`, `.wrangler`, `.vinext`, `.next`, dan `dist` bukan source code. Jangan commit cache, hasil build, atau `.env`.

Konfigurasi `.openai/hosting.json` dan plugin hosting dipertahankan. Override `image-size` di `package.json` memperbaiki versi rentan yang dipin vinext; evaluasi lagi saat upgrade vinext. Jangan memakai `npm audit fix --force` tanpa pemeriksaan kompatibilitas.

Backsound aktif adalah `public/audio/prewed3-background.m4a`, diambil langsung dari trek AAC video sumber tanpa encoding ulang dan diputar berulang. Audio baru dimuat saat tombol Buka Undangan atau tombol musik diaktifkan; pemutar tetap hidup ketika berpindah dari cover ke halaman undangan. `cover/open-invitation-link.tsx` memulai audio langsung di handler klik sebelum navigasi, tanpa menunggu loading audio atau mengandalkan event `pointerup`. Klik dengan modifier untuk tab baru tidak memulai suara di tab lama. Pada kunjungan langsung ke `/undangan`, klik atau keyboard dapat mencoba lagi jika autoplay ditolak browser. Tombol suara memakai mute/unmute, sehingga audio terus berjalan ketika dibisukan. Waktu audio menjadi acuan video: komponen video menyesuaikan posisi saat mulai, setelah seek, dan ketika drift melebihi 0,2 detik, termasuk saat kembali dari tab tersembunyi. Sinkronisasi memperhitungkan batas looping dan tidak mengunduh ulang video ketika mute berubah. Konfigurasi berada di `data/music.ts`. Catatan asal audio dan lisensi aset musik lama yang sudah tidak digunakan tersimpan di `public/audio/LICENSE.txt`.
