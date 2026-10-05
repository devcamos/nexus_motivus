import { expect, test } from '@playwright/test';

test.describe('company site smoke', () => {
  test('home page shows brand mission and contact CTA', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Software with calm clarity'
    );
    await expect(
      page.getByRole('heading', { name: 'What Nexus builds' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Contact' }).first()
    ).toBeVisible();
  });

  test('contact page lists company details and mailto', async ({ page }) => {
    await page.goto('/contact');
    await expect(
      page.getByRole('heading', { name: 'Reach Nexus Motivus' })
    ).toBeVisible();
    await expect(page.getByText('16746897', { exact: true })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'hello@nexusmotivus.ai' })
    ).toHaveAttribute('href', /mailto:hello@nexusmotivus\.ai/);
  });

  test('terms legal page is reachable as draft', async ({ page }) => {
    await page.goto('/legal/terms');
    await expect(
      page.getByRole('heading', { name: 'Terms of use' })
    ).toBeVisible();
    await expect(page.getByText(/Draft placeholder/i)).toBeVisible();
  });
});
