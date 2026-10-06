import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SiteFooter } from '@/components/SiteFooter';
import { company } from '@/lib/company';

describe('SiteFooter', () => {
  it('shows company identity and legal links', () => {
    render(<SiteFooter />);
    expect(screen.getByText(company.legalName)).toBeTruthy();
    expect(screen.getByText('United Kingdom')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute(
      'href',
      '/legal/terms'
    );
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute(
      'href',
      '/legal/privacy'
    );
    expect(screen.getByRole('link', { name: 'Refunds' })).toHaveAttribute(
      'href',
      '/legal/refund'
    );
  });
});
