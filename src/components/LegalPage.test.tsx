import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LegalPage } from '@/components/LegalPage';

describe('LegalPage', () => {
  it('marks the page as draft legal content', () => {
    render(
      <LegalPage title="Example policy">
        <p>Draft body</p>
      </LegalPage>
    );
    expect(screen.getByText(/Legal · Draft/i)).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: 'Example policy' })
    ).toBeTruthy();
    expect(screen.getByText('Draft body')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute(
      'href',
      '/contact'
    );
  });
});
