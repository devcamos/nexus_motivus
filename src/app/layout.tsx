import type { Metadata } from 'next';
import { Fraunces, Source_Sans_3 } from 'next/font/google';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { company } from '@/lib/company';

import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${company.shortName} · ${company.tagline}`,
    template: `%s · ${company.shortName}`,
  },
  description: company.mission,
  metadataBase: new URL(`https://${company.domain}`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${sourceSans.variable} flex min-h-screen flex-col antialiased`}
      >
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
