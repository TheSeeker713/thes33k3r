import { expect, test, type Page } from '@playwright/test'

declare global {
  interface Window {
    bankAudioEvents: { kind: string; src: string }[]
  }
}

test.beforeEach(async ({ page }) => {
  // Deterministic pairs let tests exercise actual gameplay without exposing app state.
  await page.addInitScript(() => {
    Math.random = () => 0.5
    window.bankAudioEvents = []
    HTMLMediaElement.prototype.play = function () {
      window.bankAudioEvents.push({ kind: 'play', src: this.src })
      return this.tagName === 'VIDEO'
        ? Promise.reject(new DOMException('Playback blocked', 'NotAllowedError'))
        : Promise.resolve()
    }
    HTMLMediaElement.prototype.pause = function () {
      window.bankAudioEvents.push({ kind: 'pause', src: this.src })
    }
  })
  await page.route('**/*.webm', route => route.abort())
})

async function enterGame(page: Page) {
  await page.goto('/games/bank')
  await page.getByRole('button', { name: 'breach', exact: true }).click()
  await page.getByRole('button', { name: 'Continue to the game', exact: true }).click()
  await expect(page.getByAltText('6 lives remaining')).toBeVisible()
}

test('first-time players can recover from a failed intro with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/games/bank')
  await page.getByRole('button', { name: 'breach', exact: true }).click()
  await expect(page.getByRole('status')).toContainText('could not play')
  await expect(page.getByRole('button', { name: 'Retry video' })).toBeVisible()
  const next = page.getByRole('button', { name: 'Continue to the game', exact: true })
  await next.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByAltText('6 lives remaining')).toBeVisible()
})

test('last life ends the game immediately and reset has no stale loss timer', async ({ page }) => {
  await enterGame(page)
  for (let life = 6; life > 0; life--) {
    const cards = page.locator('.grid button')
    await cards.nth(0).click()
    await cards.nth(1).click()
    if (life > 1) await expect(page.getByAltText((life - 1) + ' lives remaining')).toBeVisible()
  }
  await expect(page.getByText('game over', { exact: true })).toBeVisible({ timeout: 2000 })
  await expect(page.locator('.grid button')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Continue to your reward' })).toHaveCount(0)
  await page.getByRole('button', { name: 'continue', exact: true }).click()
  await page.getByRole('button', { name: 'breach', exact: true }).click()
  await page.getByRole('button', { name: 'Continue to the game', exact: true }).click()
  await page.waitForTimeout(5000)
  await expect(page.getByAltText('6 lives remaining')).toBeVisible()
  await expect(page.getByText('game over', { exact: true })).toHaveCount(0)
})

test('winning survives reward-video failure and the reward card supports Enter and Space', async ({ page }) => {
  await enterGame(page)
  for (let pair = 0; pair < 6; pair++) {
    const cards = page.locator('.grid button')
    await cards.nth(pair).click()
    await cards.nth(pair + 6).click()
    if (pair < 5) await expect(cards.nth(pair)).toHaveClass(/border-emerald/)
  }
  await expect(page.getByRole('status')).toContainText('could not play')
  const next = page.getByRole('button', { name: 'Continue to your reward', exact: true })
  await next.focus()
  await page.keyboard.press('Enter')
  const card = page.getByRole('button', { name: 'Flip the S33k3r reward card' })
  await expect(card).toHaveAttribute('aria-pressed', 'false')
  await card.focus()
  await page.keyboard.press('Enter')
  await expect(card).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText('Subject Name: THE S33K3R')).toBeVisible()
  await page.keyboard.press('Space')
  await expect(card).toHaveAttribute('aria-pressed', 'false')
})

test('client-side navigation away from gameplay stops its looping music', async ({ page }) => {
  await page.goto('/games')
  await page.locator('a[href="/games/bank"]').click()
  await page.getByRole('button', { name: 'breach', exact: true }).click()
  await page.getByRole('button', { name: 'Continue to the game', exact: true }).click()
  await expect.poll(() => page.evaluate(() => window.bankAudioEvents.some(event =>
    event.kind === 'play' && decodeURI(event.src).includes('Echoes in the Static.mp3'),
  ))).toBe(true)
  await page.goBack()
  await expect(page).toHaveURL('/games')
  await expect.poll(() => page.evaluate(() => window.bankAudioEvents.some(event =>
    event.kind === 'pause' && decodeURI(event.src).includes('Echoes in the Static.mp3'),
  ))).toBe(true)
})

test('static preview serves extensionless routes and a real 404', async ({ request }) => {
  expect((await request.get('/games/bank')).status()).toBe(200)
  expect((await request.get('/devlog/devlog01')).status()).toBe(200)
  expect((await request.get('/does-not-exist')).status()).toBe(404)
})
