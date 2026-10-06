import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: `Draft terms of use for ${company.legalName}.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use">
      <p>
        <strong>Draft placeholder.</strong> These terms are not final legal
        advice and do not yet constitute binding site terms. Full copy will
        replace this page before any production claim of readiness.
      </p>
      <p>
        Until then, use of this website is at your own discretion.{' '}
        {company.legalName} may update this page without notice as formal terms
        are prepared.
      </p>
      <p>
        Nothing on this page creates a contract for goods or services. Product
        terms, if any, will be published separately for each product.
      </p>
    </LegalPage>
  );
}
