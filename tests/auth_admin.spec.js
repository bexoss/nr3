const { test, expect } = require('@playwright/test')

test.describe('Admin access', () => {
  test('Login with admin and view admin/products', async ({ page }) => {
    await page.goto('/login')
    await page.getByPlaceholder('Email').fill('admin@local.test')
    await page.getByPlaceholder('Password').fill('changeme123!')
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole('button', { name: '로그인' }).click()
    ])
    await expect(page).toHaveURL(/\/mypage/)

    await page.goto('/admin/products')
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
    // Expect table headers
    await expect(page.getByText('SKU')).toBeVisible()
  })
})
