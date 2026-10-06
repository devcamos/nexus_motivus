import Link from 'next/link';

import { Container } from '@/components/Container';
import { company, navLinks } from '@/lib/company';

export function SiteHeader() {
  return (
    <header className="border-b border-ink/10 bg-cream/80 backdrop-blur-sm">
      <Container className="flex items-center justify-between gap-6 py-5">
        <Link
          href="/"
          className="font-display text-lg tracking-[0.08em] text-ink transition-colors hover:text-copper-deep sm:text-xl"
        >
          {company.shortName}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/70 transition-colors hover:text-copper-deep"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
