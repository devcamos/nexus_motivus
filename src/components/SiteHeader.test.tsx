import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@/components/SiteHeader';
import { company } from '@/lib/company';

describe('SiteHeader', () => {
  it('renders the brand and primary links', () => {
    render(<SiteHeader />);
    expect(
      screen.getByRole('link', { name: company.shortName })
    ).toHaveAttribute('href', '/');
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/contact'
    );
  });
});
