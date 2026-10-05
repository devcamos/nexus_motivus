import { describe, expect, it } from 'vitest';

import {
  company,
  contactMailto,
  legalLinks,
  navLinks,
  whatWeBuild,
} from '@/lib/company';

describe('company constants', () => {
  it('exposes the UK company identity', () => {
    expect(company.legalName).toBe('NEXUS MOTIVUS LTD');
    expect(company.companyNumber).toBe('16746897');
    expect(company.email).toContain('@nexusmotivus.ai');
  });

  it('includes primary navigation destinations', () => {
    expect(navLinks.map((link) => link.href)).toEqual(['/', '/contact']);
  });

  it('includes legal destinations', () => {
    expect(legalLinks.map((link) => link.href)).toEqual([
      '/legal/terms',
      '/legal/privacy',
      '/legal/refund',
    ]);
  });

  it('describes what the company builds', () => {
    expect(whatWeBuild.length).toBeGreaterThanOrEqual(3);
    for (const item of whatWeBuild) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.body.length).toBeGreaterThan(0);
    }
  });
});

describe('contactMailto', () => {
  it('returns a plain mailto without a subject', () => {
    expect(contactMailto()).toBe(`mailto:${company.email}`);
  });

  it('encodes a subject when provided', () => {
    expect(contactMailto('Hello from the website')).toBe(
      `mailto:${company.email}?subject=Hello%20from%20the%20website`
    );
  });
});
