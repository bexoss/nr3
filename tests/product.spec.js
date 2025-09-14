const { test, expect } = require('@playwright/test')

test('Product detail opens from shop', async ({ page }) => {
  await page.goto('/shop')
  const first = page.locator('a[href^="/p/"]').first()
  await first.click()
  await expect(page).toHaveURL(/\/p\//)
  // Shows name/title and price
  await expect(page.locator('text=₩')).toBeVisible()
})

