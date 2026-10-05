import Link from 'next/link';
import type { ReactNode } from 'react';

import { Container } from '@/components/Container';

type LegalPageProps = Readonly<{
  title: string;
  children: ReactNode;
}>;

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <Container as="main" className="py-16 sm:py-20">
      <p className="mb-4 text-xs uppercase tracking-[0.18em] text-copper">
        Legal · Draft
      </p>
      <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
        {title}
      </h1>
      <div className="mt-8 max-w-2xl space-y-4 text-base leading-relaxed text-ink/75">
        {children}
      </div>
      <p className="mt-10 text-sm text-ink/55">
        Questions?{' '}
        <Link
          href="/contact"
          className="text-copper underline-offset-4 hover:underline"
        >
          Contact us
        </Link>
        .
      </p>
    </Container>
  );
}
