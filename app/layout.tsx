import type { Metadata } from 'next';
import { Montserrat, Cookie, Inter } from 'next/font/google';
import { invitation } from '@/features/invitation/data/wedding';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-inter',
  display: 'swap',
});
const cookie = Cookie({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-cookie',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `The Wedding of ${invitation.groom} & ${invitation.bride}`,
  description: `Undangan pernikahan ${invitation.groom} dan ${invitation.bride}, ${invitation.dateLong}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${montserrat.variable} ${inter.variable} ${cookie.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
