import type { Metadata } from 'next';
import { Courgette, Barlow, Cabin } from 'next/font/google';
import './globals.css';
const script = Courgette({ weight: '400', subsets: ['latin'], variable: '--font-script', display: 'swap' });
const sans = Barlow({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-body', display: 'swap' });
const greeting = Cabin({ weight: '400', subsets: ['latin'], variable: '--font-greeting', display: 'swap' });
export const metadata: Metadata = { title: 'The Wedding of Verdo & Intan', description: 'Join us to celebrate a new chapter filled with love, laughter, and a brighter tomorrow.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${script.variable} ${sans.variable} ${greeting.variable}`}>{children}</body></html>; }
