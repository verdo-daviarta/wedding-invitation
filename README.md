# Undangan Pernikahan Verdo & Intan

React + TypeScript + vinext (App Router di atas Vite). Pengembangan dilakukan di lokal; deployment hanya atas permintaan pemilik proyek.

## Menjalankan proyek

Node.js >= 22.13 dan npm diperlukan. Pengujian terakhir memakai Node.js 24.

```powershell
npm.cmd ci
npm.cmd run dev
```

Buka URL **Local** yang tercetak di terminal. Port awal 3000, atau port berikutnya jika terpakai. Di macOS/Linux gunakan `npm` tanpa `.cmd`.

```powershell
npm.cmd run check    # TypeScript, lint, unit test, format
npm.cmd run format   # Format seluruh source yang dipelihara
npm.cmd test         # Pengujian fungsi waktu dan validasi data
```

`npm run build` membuat bundle produksi. `npm start` memerlukan hasil build dan menjalankan preview Wrangler, bukan dev server. Build/deploy tidak dijalankan otomatis untuk perubahan lokal.

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

CSS section diimpor melalui **satu** `invitation.module.css`. Vite menggabungkan `@import` sebelum CSS Modules memberi scope, sehingga selector lintas-section konsisten. Jangan mengimpor partial CSS langsung dari komponen. Warna undangan berada di `styles/00-base.css`; cover memakai `app/globals.css`.

## Status fitur

- RSVP masih di memori halaman. Reload menghapus jawaban; belum dikirim ke server.
- Wishes memakai `localStorage`, key `verdo-intan:wish-submission:v1`, hanya terlihat pada browser/origin yang sama.
- Batas satu ucapan berlaku per browser, bukan identitas undangan. Backend/token/rate limiting masih perlu dibuat sebelum go-live.
- Sanitasi client bukan pengganti validasi server. Ucapan selalu dirender sebagai teks React, bukan HTML.
- Tombol sosial sengaja nonaktif. Foto, kutipan pengantar, identitas keluarga, dan contact person perlu konten final.
- Kalender mengikuti permintaan **08.00–13.00 WIB**, tetapi resepsi tertulis **11.00–14.00 WIB**. Perbedaan ini perlu konfirmasi sebelum go-live.

## Aset dan hosting

`public/audio`, `public/fonts`, `public/images`, dan `public/placeholders` berisi aset aktif. Video, kelopak, dan `public/journey` adalah aset desain lama yang tetap disimpan, tidak dimuat halaman sekarang. `images/` lokal berisi desain sumber, bukan URL publik.

Foto asli Our Moment berada di `images/Prewed`. Galeri memuat salinan WebP di `public/images/prewed` dengan dua ukuran (360 dan 720 piksel); browser memilih ukuran sesuai layar dan zoom. Susunan dua kolom, teks alternatif, dimensi, dan titik fokus foto diatur di `data/gallery.ts`. Ukuran bingkai mengikuti rasio asli, sedangkan isinya di-zoom agar subjek lebih jelas. Atur `focus.x` dan `focus.y` (0–100 persen) untuk jangkar zoom, serta `focus.zoom` (`1` untuk frame utuh, lebih besar untuk mendekatkan subjek). Nilai ini ditentukan per foto, bukan deteksi objek otomatis. CSS `overflow: hidden` membatasi crop di dalam bingkai; file gambar asli tidak diubah.

Klik foto Our Moment untuk memperbesar foto tersebut langsung di grid hingga selebar dua kolom, tanpa panel tambahan. Foto terpilih menampilkan frame utuh dengan `object-fit: contain` dan tinggi maksimum `min(60svh, 32rem)`. Klik ulang atau tekan `Escape` pada foto untuk mengembalikannya ke thumbnail; memilih foto lain memulihkan foto sebelumnya. Urutan kiri/kanan dari `galleryColumns` dipertahankan sebagai urutan baris di grid. Interaksi diatur di `sections/06-moments/moment-gallery.tsx`; ukuran foto di `styles/06-moments.css`.

Arsip deployment lama disimpan di `.local-archive/deployments/`, di luar pelacakan Git. `.tmp`, `node_modules`, `.wrangler`, `.vinext`, `.next`, dan `dist` bukan source code. Jangan commit cache, hasil build, atau `.env`.

Konfigurasi `.openai/hosting.json` dan plugin hosting dipertahankan. Override `image-size` di `package.json` memperbaiki versi rentan yang dipin vinext; evaluasi lagi saat upgrade vinext. Jangan memakai `npm audit fix --force` tanpa pemeriksaan kompatibilitas.

Saat mengganti musik, perbarui `data/music.ts`, aset audio, dan `public/audio/LICENSE.txt` bersama-sama. Footer mengambil atribusi dari konfigurasi musik.
