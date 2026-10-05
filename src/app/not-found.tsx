import Link from 'next/link';

import { Container } from '@/components/Container';

export default function NotFound() {
  return (
    <Container as="main" className="py-24 text-center">
      <h1 className="font-display text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink/65">
        That path does not exist on the Nexus Motivus site.
      </p>
      <Link
        href="/"
        className="cta-link mt-8 inline-flex text-copper hover:text-copper-deep"
      >
        Back home
      </Link>
    </Container>
  );
}
