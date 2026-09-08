import type { Metadata } from 'next';
import { Courgette, Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';
const script = Courgette({ weight: '400', subsets: ['latin'], variable: '--font-script', display: 'swap' });
const sans = Barlow({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-body', display: 'swap' });
const condensed = Barlow_Condensed({ weight: '400', subsets: ['latin'], variable: '--font-nav', display: 'swap' });
export const metadata: Metadata = { title: 'V / I — Wedding Invitation', description: 'Join us to celebrate a new chapter filled with love, laughter, and a brighter tomorrow.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${script.variable} ${sans.variable} ${condensed.variable}`}>{children}</body></html>; }
