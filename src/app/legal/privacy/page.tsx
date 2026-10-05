import type { Metadata } from 'next';

import { LegalPage } from '@/components/LegalPage';
import { company } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `Draft privacy notice for ${company.legalName}.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        <strong>Draft placeholder.</strong> This privacy notice is incomplete
        and will be replaced with formal UK GDPR / Data Protection Act 2018
        wording before production use.
      </p>
      <p>
        This marketing site does not require accounts, does not accept uploads,
        and does not intentionally collect personal data beyond what your
        browser or email client may send when you contact us.
      </p>
      <p>
        If you email {company.email}, we will process the content of that
        correspondence as needed to respond. A full controller notice, lawful
        bases, retention periods, and rights information will appear here once
        supplied.
      </p>
    </LegalPage>
  );
}
