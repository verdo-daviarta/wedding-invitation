// Web-sized copies of images/Prewed. Dimensions preserve the original frame ratio.
// Curated mixed columns are independent of filenames and source folder order.
// Focus is the zoom anchor in percentages; zoom 1 shows the original full frame.
export const galleryColumns = [
  [
    {
      file: 'prewed-07',
      width: 720,
      height: 541,
      focus: { x: 78, y: 100, zoom: 2.3 },
      alt: 'Verdo dan Intan berjalan bersama melintasi taman',
    },
    {
      file: 'prewed-03',
      width: 720,
      height: 530,
      focus: { x: 15, y: 90, zoom: 1.7 },
      alt: 'Verdo dan Intan saling menatap di bawah pohon pinus',
    },
    {
      file: 'prewed-10',
      width: 720,
      height: 525,
      focus: { x: 29, y: 100, zoom: 2.3 },
      alt: 'Verdo dan Intan saling menatap sambil bergandengan tangan di taman',
    },
    {
      file: 'prewed-05',
      width: 720,
      height: 958,
      focus: { x: 44, y: 98, zoom: 1.8 },
      alt: 'Intan tersenyum sambil duduk di halaman rumput',
    },
    {
      file: 'prewed-01',
      width: 720,
      height: 541,
      focus: { x: 100, y: 65, zoom: 1.25 },
      alt: 'Verdo dan Intan bergandengan tangan di antara pepohonan pinus',
    },
  ],
  [
    {
      file: 'prewed-04',
      width: 720,
      height: 958,
      focus: { x: 35, y: 94, zoom: 2.15 },
      alt: 'Verdo dan Intan duduk bersama di halaman bangunan bertingkat',
    },
    {
      file: 'prewed-09',
      width: 720,
      height: 541,
      focus: { x: 38, y: 100, zoom: 1.65 },
      alt: 'Verdo dan Intan berpose dengan latar pepohonan dan langit biru',
    },
    {
      file: 'prewed-02',
      width: 720,
      height: 541,
      focus: { x: 80, y: 65, zoom: 1.08 },
      alt: 'Verdo dan Intan tersenyum di kedua sisi pohon pinus',
    },
    {
      file: 'prewed-06',
      width: 720,
      height: 637,
      focus: { x: 80, y: 100, zoom: 2.05 },
      alt: 'Intan bersandar di bahu Verdo di taman hijau',
    },
    {
      file: 'prewed-08',
      width: 720,
      height: 541,
      focus: { x: 49, y: 100, zoom: 2.4 },
      alt: 'Verdo dan Intan berdiri berdampingan di bawah pepohonan rindang',
    },
  ],
] as const;
