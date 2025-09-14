const { test, expect } = require('@playwright/test')

test('Landing page renders hero and Shop link', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Glow with Confidence')).toBeVisible()
  await page.getByRole('link', { name: '지금 쇼핑하기' }).click()
  await expect(page).toHaveURL(/\/shop/)
})

