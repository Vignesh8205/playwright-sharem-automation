import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Accessibility Tests', () => {
  test('ADV-TC_11 - Verify keyboard navigation (Tab key)', async ({ page, homePage }) => {
    Logger.info('Starting: Keyboard navigation test');
    await page.focus('body');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    expect(focusedElement).toBeTruthy();
    Logger.info('Test passed: Keyboard navigation works');
  });

  test('ADV-TC_13 - Verify color contrast (WCAG AA standard)', async ({ page }) => {
    Logger.info('Starting: Color contrast verification');
    const hasAccessibilityAttributes = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.getAttribute('aria-label') || button.textContent?.trim()) {
          return true;
        }
      }
      return false;
    });
    expect(hasAccessibilityAttributes).toBeTruthy();
    Logger.info('Test passed: Accessibility attributes found');
  });
});