import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { company, contactMailto } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Contact ${company.legalName}.`,
};

export default function ContactPage() {
  return (
    <Container as="main" className="py-16 sm:py-24">
      <p className="animate-rise text-xs uppercase tracking-[0.18em] text-copper-deep">
        Contact
      </p>
      <h1 className="animate-rise-delay mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
        Reach Nexus Motivus
      </h1>
      <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
        For product enquiries, partnerships, or general questions, email us
        directly. There is no form backend on this site.
      </p>

      <dl className="mt-12 max-w-lg space-y-8 border-t border-ink/10 pt-10">
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-ink/45">
            Company
          </dt>
          <dd className="mt-2 text-base text-ink">{company.legalName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-ink/45">
            Email
          </dt>
          <dd className="mt-2">
            <a
              href={contactMailto()}
              className="cta-link text-lg text-copper-deep"
            >
              {company.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.16em] text-ink/45">
            Jurisdiction
          </dt>
          <dd className="mt-2 text-base text-ink">United Kingdom</dd>
        </div>
      </dl>
    </Container>
  );
}
