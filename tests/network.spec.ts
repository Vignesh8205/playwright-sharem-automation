import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Network Tests', () => {
  test('ADV-TC_04 - Test behavior when connection is lost', async ({ page, homePage }) => {
    Logger.info('Starting: Connection loss handling test');
    await page.context().setOffline(true);
    Logger.info('Connection set to offline');
    await homePage.fill(homePage['messageInput'], 'Offline message');
    await page.context().setOffline(false);
    Logger.info('Connection restored');
    const isHomeLoaded = await homePage.isHomeLoaded();
    expect(isHomeLoaded).toBeTruthy();
    Logger.info('Test passed: Connection loss handled gracefully');
  });
});