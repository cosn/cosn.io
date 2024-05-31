import { test, expect } from '@playwright/test'

test('check homepage', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Pragmatic Optimism/)
  await expect(page.getByRole('article')).not.toHaveCount(0)
})

test('loads posts', async ({ page }) => {
  await page.goto('/')

  const isMenuVisible = await page.isVisible('text=Menu')
  if (isMenuVisible) {
    await page.click('text=Menu')
  }

  await page.getByRole('link', { name: 'Posts' }).click()
  await expect(page.getByRole('article')).not.toHaveCount(0)
})
