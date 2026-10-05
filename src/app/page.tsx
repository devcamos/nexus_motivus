import Link from 'next/link';

import { Container } from '@/components/Container';
import { company, contactMailto, whatWeBuild } from '@/lib/company';

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-fade"
        >
          <div className="absolute inset-y-0 right-0 w-full max-w-xl bg-[radial-gradient(ellipse_at_center,rgba(184,90,42,0.18),transparent_70%)] sm:w-1/2" />
          <svg
            className="absolute bottom-0 right-0 h-[70%] w-[55%] text-ink/[0.04]"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="220"
              cy="180"
              r="140"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="220"
              cy="180"
              r="90"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="220"
              cy="180"
              r="40"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M220 40 V320 M80 180 H360"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="220"
              cy="180"
              r="6"
              fill="currentColor"
              className="text-copper/40"
            />
          </svg>
        </div>

        <Container
          as="main"
          className="relative flex min-h-[78vh] flex-col justify-center py-20 sm:py-28"
        >
          <p className="animate-rise font-display text-sm uppercase tracking-[0.28em] text-copper">
            {company.shortName}
          </p>
          <h1 className="animate-rise-delay mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {company.tagline}
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
            {company.mission}
          </p>
          <div className="animate-rise-delay-2 mt-10">
            <Link
              href="/contact"
              className="cta-link font-display text-lg text-copper transition-colors hover:text-copper-deep"
            >
              Contact
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-ink/10 bg-cream/60 py-20 sm:py-24">
        <Container>
          <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
            What Nexus builds
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
            A small UK company focused on software that feels quiet, durable,
            and useful from the first use.
          </p>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {whatWeBuild.map((item) => (
              <li key={item.title} className="space-y-3">
                <h3 className="font-display text-xl text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink/65">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-14 text-sm text-ink/55">
            Prefer email?{' '}
            <a
              href={contactMailto('Hello from the website')}
              className="text-copper underline-offset-4 hover:underline"
            >
              {company.email}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
