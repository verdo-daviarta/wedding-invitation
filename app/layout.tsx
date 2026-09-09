import type { Metadata } from 'next';
import { Cabin, Inter } from 'next/font/google';
import './globals.css';

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Wedding of Verdo & Intan',
  description: 'Undangan pernikahan Verdo dan Intan.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${cabin.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
