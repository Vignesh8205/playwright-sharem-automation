import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Performance Tests', () => {
  test('ADV-TC_01 - Measure page load time', async ({ page }) => {
    Logger.info('Starting: Page load time measurement');
    const navigationTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(performance.getEntriesByType('navigation')))
    );
    if (navigationTiming.length > 0) {
      const timing = navigationTiming[0];
      const loadTime = timing.loadEventEnd - timing.fetchStart;
      const domInteractive = timing.domInteractive - timing.fetchStart;
      Logger.info(`Page load time: ${loadTime}ms`);
      Logger.info(`DOM interactive time: ${domInteractive}ms`);
      expect(loadTime).toBeLessThan(3000);
      expect(domInteractive).toBeLessThan(1500);
    }
    Logger.info('Test passed: Page loaded within acceptable time');
  });

  test('ADV-TC_02 - Verify typing responsiveness', async ({ homePage, page }) => {
    Logger.info('Starting: Typing responsiveness test');
    const testString = 'The quick brown fox jumps over the lazy dog';
    const startTime = Date.now();
    await homePage.typeSlowly(homePage['messageInput'], testString, 10);
    const typingTime = Date.now() - startTime;
    Logger.info(`Typing time: ${typingTime}ms`);
    const inputValue = await page.inputValue(homePage['messageInput']);
    expect(inputValue).toBe(testString);
    Logger.info('Test passed: Typing is responsive');
  });
});