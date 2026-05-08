import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Storage & Persistence Tests', () => {
  test('ADV-TC_15 - Test localStorage/sessionStorage behavior', async ({ page }) => {
    Logger.info('Starting: Storage behavior test');
    const storageData = await page.evaluate(() => {
      return {
        localStorage: Object.entries(localStorage),
        sessionStorage: Object.entries(sessionStorage),
      };
    });
    Logger.info(`LocalStorage items: ${storageData.localStorage.length}`);
    Logger.info(`SessionStorage items: ${storageData.sessionStorage.length}`);
    const dataString = JSON.stringify(storageData);
    expect(dataString).not.toContain('password');
    expect(dataString).not.toContain('token');
    Logger.info('Test passed: Storage data is handled safely');
  });
});