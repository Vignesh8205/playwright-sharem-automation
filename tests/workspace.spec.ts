import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Workspace Tests', () => {
  test('ADV-TC_25 - Rapid workspace switching', async ({ homePage, page }) => {
    Logger.info('Starting: Rapid workspace switching');
    await homePage.selectWorkspace('clientLaptop');
    await homePage.sendMessage('Client Laptop message');
    await homePage.selectWorkspace('personalDevice');
    await homePage.sendMessage('Personal Device message');
    for (let i = 0; i < 10; i++) {
      await homePage.selectWorkspace(i % 2 === 0 ? 'clientLaptop' : 'personalDevice');
      await page.waitForTimeout(100);
    }
    const messageCount = await homePage.getMessageCount();
    expect(messageCount).toBeGreaterThan(0);
    Logger.info('Test passed: Rapid workspace switching handled correctly');
  });

  test('ADV-TC_16 - Verify workspace state persists across sessions', async ({ page, homePage }) => {
    Logger.info('Starting: Workspace state persistence');
    await homePage.selectWorkspace('personalDevice');
    await homePage.sendMessage('Test message in Personal Device');
    const messageCountBefore = await homePage.getMessageCount();
    await page.reload();
    await homePage.waitForElement(homePage['homeTitle']);
    const messageCountAfter = await homePage.getMessageCount();
    expect(messageCountAfter).toBeGreaterThanOrEqual(messageCountBefore);
    Logger.info('Test passed: Workspace state persisted');
  });
});