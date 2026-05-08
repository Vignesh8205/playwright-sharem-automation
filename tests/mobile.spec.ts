import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { Logger } from '../utils/logger';

const mobileTest = test.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    await use(homePage);
  },
});

mobileTest.describe('Mobile Tests', () => {
  mobileTest('ADV-TC_17 - Test layout on mobile device (375px width)', async ({ page, homePage }) => {
    Logger.info('Starting: Mobile layout test (375px)');
    await page.setViewportSize({ width: 375, height: 667 });
    const messageInput = await homePage.isVisible(homePage['messageInput']);
    expect(messageInput).toBeTruthy();
    await homePage.sendMessage('Mobile test message');
    const lastMessage = await homePage.getLastMessage();
    expect(lastMessage).toContain('Mobile test message');
    Logger.info('Test passed: Mobile layout works correctly');
  });

  mobileTest('ADV-TC_18 - Test layout on tablet device (768px width)', async ({ page, homePage }) => {
    Logger.info('Starting: Tablet layout test (768px)');
    await page.setViewportSize({ width: 768, height: 1024 });
    const messageInput = await homePage.isVisible(homePage['messageInput']);
    expect(messageInput).toBeTruthy();
    await homePage.sendMessage('Tablet test message');
    const messageCount = await homePage.getMessageCount();
    expect(messageCount).toBeGreaterThan(0);
    Logger.info('Test passed: Tablet layout works correctly');
  });
});