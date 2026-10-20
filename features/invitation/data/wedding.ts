import { toCalendarTimestamp } from '../lib/event-time';

export const invitation = {
  date: '26/12',
  dateISO: '2026-12-26',
  startsAt: '2026-12-26T08:00:00+07:00',
  calendarEndsAt: '2026-12-26T13:00:00+07:00',
  timeZone: 'Asia/Jakarta',
  time: '08.00 WIB',
  dateLong: 'Sabtu, 26 Desember 2026',
  dateEnglish: '26 December 2026',
  year: '2026',
  bride: 'Intan',
  groom: 'Verdo',
  venue: 'Hotel Dana Solo',
  address:
    'Jl. Slamet Riyadi St No.286, Sriwedari, Laweyan, Kota Surakarta, Jawa Tengah 57141',
};

export const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams(
  {
    action: 'TEMPLATE',
    text: `The Wedding of ${invitation.groom} & ${invitation.bride}`,
    dates: `${toCalendarTimestamp(invitation.startsAt)}/${toCalendarTimestamp(invitation.calendarEndsAt)}`,
    details: `Pernikahan ${invitation.groom} dan ${invitation.bride}`,
    location: `${invitation.venue}, Indonesia`,
    ctz: invitation.timeZone,
  },
).toString()}`;

export const couple = [
  {
    title: 'The Bride',
    name: invitation.bride,
    fullName: 'Carolina Haslita Intan Cahyaningrum, S.M',
    photo: {
      src: '/images/profiles/bride.webp',
      width: 1087,
      height: 1446,
      position: '27% 95%',
      zoom: 1.65,
    },
    family:
      'Putri pertama dari\nBpk. Mayjen TNI (Purn.) Hendrikus Joko R.\n&\nIbu Joelia Eri S. S.E',
    socialHandle: 'intan1210',
  },
  {
    title: 'The Groom',
    name: invitation.groom,
    fullName: 'Benidiktus Verdo Daviarta, S.E, M.Msi',
    photo: {
      src: '/images/profiles/groom.webp',
      width: 1445,
      height: 1088,
      position: '0% 35%',
      zoom: 1.25,
    },
    family:
      'Putra kedua dari\nBpk. Kolonel (purn) Drs. E.C. Lustyo W.\n&\nIbu Dra. Anna Maria E.',
    socialHandle: 'verdo_aseli',
  },
] as const;

export const bankAccounts = [
  {
    bank: 'Mandiri',
    logo: '/images/mandiri.svg',
    holder: 'Benidiktus Verdo Dav',
    displayNumber: '1570 0102 6013 2',
    number: '1570010260132',
    owner: invitation.groom,
  },
  {
    bank: 'BCA',
    logo: '/images/bca.svg',
    holder: 'Carolina Haslita Intan C.',
    displayNumber: '1662 4558 94',
    number: '1662455894',
    owner: invitation.bride,
  },
] as const;

export const events = [
  {
    title: 'Pemberkatan',
    time: '08.00 - 10.00 WIB',
    venue: 'Paroki St. Maria Diangkat Ke Surga - Palur',
    addressLine1: 'Jl. Cemp. No.1, Randurejo, Ngringo,',
    addressLine2: 'Kabupaten Karanganyar, Jawa Tengah 57772',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Paroki%20St.%20Maria%20Diangkat%20Ke%20Surga%20-%20Palur%2C%20Jl.%20Cemp.%20No.1%2C%20Randurejo%2C%20Ngringo%2C%20Karanganyar%2C%20Kabupaten%20Karanganyar%2C%20Jawa%20Tengah%2057772',
  },
  {
    title: 'Resepsi',
    time: '11.00 - 14.00 WIB',
    venue: invitation.venue,
    addressLine1: 'Jl. Slamet Riyadi St No.286, Sriwedari, Laweyan',
    addressLine2: 'Kota Surakarta, Jawa Tengah 57141',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Hotel%20Dana%20Solo%2C%20Jl.%20Slamet%20Riyadi%20St%20No.286%2C%20Sriwedari%2C%20Laweyan%2C%20Surakarta%20City%2C%20Central%20Java%2057141',
  },
];

export const story = [
  {
    title: 'Awal Bertemu',
    text: 'Semua berawal dari pertemuan sederhana yang tak pernah direncanakan. Dari sapaan singkat, perlahan tumbuh rasa nyaman yang sulit dijelaskan.',
  },
  {
    title: 'Menjalin Hubungan',
    text: 'Hari demi hari, kami belajar mengenal satu sama lain, tentang mimpi, kebiasaan kecil, dan cara kami saling melengkapi.',
  },
  {
    title: 'Hari Pernikahan',
    text: 'Kini, perjalanan itu membawa kami pada langkah baru yang lebih berarti: menjadi dua jiwa yang bersatu dalam satu janji suci.',
  },
];
