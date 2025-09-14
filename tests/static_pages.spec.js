const { test, expect } = require('@playwright/test')

test('About page loads', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('heading', { name: '브랜드 스토리' })).toBeVisible()
})

test('Usage guide page loads', async ({ page }) => {
  await page.goto('/usage-guide')
  await expect(page.getByRole('heading', { name: '사용법 안내' })).toBeVisible()
})

test('Support page loads', async ({ page }) => {
  await page.goto('/support')
  await expect(page.getByRole('heading', { name: '고객 지원' })).toBeVisible()
})

test('Cart page loads', async ({ page }) => {
  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: '장바구니' })).toBeVisible()
})

