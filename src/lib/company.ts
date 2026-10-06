export const company = {
  legalName: 'NEXUS MOTIVUS LTD',
  shortName: 'Nexus Motivus',
  email: 'hello@nexusmotivus.ai',
  domain: 'nexusmotivus.ai',
  tagline: 'Software with calm clarity.',
  mission:
    'We build focused software products that help people and teams move with clarity — without noise, clutter, or unnecessary complexity.',
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact' },
] as const;

export const legalLinks = [
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/refund', label: 'Refunds' },
] as const;

export const whatWeBuild = [
  {
    title: 'Product craft',
    body: 'Thoughtful interfaces and reliable foundations for tools people return to.',
  },
  {
    title: 'Practical systems',
    body: 'APIs, workflows, and data surfaces that stay understandable as they grow.',
  },
  {
    title: 'Steady delivery',
    body: 'Preview-first shipping, clear quality bars, and calm iteration over hype.',
  },
] as const;

export function contactMailto(subject?: string): string {
  const base = `mailto:${company.email}`;
  if (!subject) {
    return base;
  }
  return `${base}?subject=${encodeURIComponent(subject)}`;
}
