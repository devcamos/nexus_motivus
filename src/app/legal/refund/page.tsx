import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Refunds',
  description: `Draft refund policy for ${company.legalName}.`,
};

export default function RefundPage() {
  return (
    <LegalPage title="Refunds">
      <p>
        <strong>Draft placeholder.</strong> {company.legalName} does not sell
        products or subscriptions through this marketing website. There are
        currently no refundable purchases on this site.
      </p>
      <p>
        When a product offers paid plans, its refund policy will be published on
        that product and linked from this page. Until then, this page exists
        only as structured placeholder copy.
      </p>
      <p>
        For questions about a future purchase or invoice, contact{' '}
        {company.email}.
      </p>
    </LegalPage>
  );
}
