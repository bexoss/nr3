const { test, expect } = require('@playwright/test')

test('Shop lists seeded products', async ({ page }) => {
  await page.goto('/shop')
  // Wait for cards to render
  await expect(page.getByRole('heading', { name: 'SHOP' })).toBeVisible()
  // There should be at least one product
  const cards = page.locator('a[href^="/p/"]')
  await expect(cards).toHaveCountGreaterThan(0)
})

expect.extend({
  async toHaveCountGreaterThan(locator, min) {
    const count = await locator.count()
    const pass = count > min
    return {
      pass,
      message: () => `expected count > ${min}, got ${count}`
    }
  }
})

