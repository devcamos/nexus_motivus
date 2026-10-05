import Link from 'next/link';

import { Container } from '@/components/Container';
import { company, legalLinks } from '@/lib/company';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream-dim">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="font-display text-base tracking-[0.06em] text-ink">
            {company.legalName}
          </p>
          <p className="text-sm text-ink/60">
            Company number {company.companyNumber}
          </p>
          <p className="text-sm text-ink/60">United Kingdom</p>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/70 transition-colors hover:text-copper"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
