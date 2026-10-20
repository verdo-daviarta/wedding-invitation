// Web-sized copies of the current images/Prewed library.
// Shuffled once during preparation; the order stays stable during rendering.
// Source identifies the original; the content hash refreshes changed photos.
// Focus uses percentage anchors; zoom 1 shows the original full frame.
export const galleryPhotos = [
  {
    file: 'p1640183-0255ea89',
    source: 'P1640183-prewedding-warm.png',
    width: 720,
    height: 541,
    focus: {
      x: 100,
      y: 65,
      zoom: 1.25,
    },
    alt: 'Verdo dan Intan bergandengan tangan di antara pepohonan pinus',
    large: {
      width: 1446,
      height: 1087,
    },
  },
  {
    file: 'p1640243-e577e034',
    source: 'P1640243-prewedding-warm-1.png',
    width: 720,
    height: 530,
    focus: {
      x: 15,
      y: 90,
      zoom: 1.7,
    },
    alt: 'Verdo dan Intan saling menatap di bawah pohon pinus',
    large: {
      width: 1206,
      height: 887,
    },
  },
  {
    file: 'p1640256-a5b07ae5',
    source: 'P1640256-prewedding-warm.png',
    width: 720,
    height: 958,
    focus: {
      x: 35,
      y: 94,
      zoom: 2.15,
    },
    alt: 'Verdo dan Intan duduk bersama di halaman bangunan bertingkat',
    large: {
      width: 1087,
      height: 1447,
    },
  },
  {
    file: 'p1640423-f39b2aa1',
    source: 'P1640423-prewedding-natural-warm.png',
    width: 720,
    height: 542,
    focus: {
      x: 60,
      y: 80,
      zoom: 1.05,
    },
    alt: 'Verdo dan Intan saling menatap di antara dedaunan tropis',
    large: {
      width: 1446,
      height: 1088,
    },
  },
  {
    file: 'p1640472-f31a4c13',
    source: 'P1640472-prewedding-natural-warm.png',
    width: 720,
    height: 541,
    focus: {
      x: 50,
      y: 85,
      zoom: 1.2,
    },
    alt: 'Verdo dan Intan berjalan bergandengan tangan melintasi bukit rumput',
    large: {
      width: 1447,
      height: 1087,
    },
  },
  {
    file: 'p1640364-a35fbabe',
    source: 'P1640364-prewedding-natural-warm.png',
    width: 720,
    height: 542,
    focus: {
      x: 42,
      y: 95,
      zoom: 1.45,
    },
    alt: 'Verdo menggendong Intan di taman yang dipenuhi pepohonan',
    large: {
      width: 1446,
      height: 1088,
    },
  },
  {
    file: 'p1640305-0bd2c993',
    source: 'P1640305-prewedding-natural-blue-clean-tree-v2.png',
    width: 720,
    height: 541,
    focus: {
      x: 38,
      y: 100,
      zoom: 1.65,
    },
    alt: 'Verdo dan Intan berpose dengan latar pepohonan dan langit biru',
    large: {
      width: 1920,
      height: 1443,
    },
  },
  {
    file: 'p1640203-003fa832',
    source: 'P1640203-prewedding-warm.png',
    width: 720,
    height: 541,
    focus: {
      x: 80,
      y: 65,
      zoom: 1.08,
    },
    alt: 'Verdo dan Intan tersenyum di kedua sisi pohon pinus',
    large: {
      width: 1446,
      height: 1087,
    },
  },
  {
    file: 'p1640302-93a459fd',
    source: 'P1640302-prewedding-soft-golden-clean-v2.png',
    width: 720,
    height: 541,
    focus: {
      x: 49,
      y: 100,
      zoom: 2.4,
    },
    alt: 'Verdo dan Intan berdiri berdampingan di bawah pepohonan rindang',
    large: {
      width: 1920,
      height: 1443,
    },
  },
  {
    file: 'p1640410-b8a25758',
    source: 'P1640410-prewedding-natural-warm.png',
    width: 720,
    height: 699,
    focus: {
      x: 50,
      y: 50,
      zoom: 1,
    },
    alt: 'Verdo dan Intan menikmati piknik bersama di atas alas merah muda',
    large: {
      width: 1118,
      height: 1086,
    },
  },
] as const;

export type GalleryPhoto = (typeof galleryPhotos)[number];
