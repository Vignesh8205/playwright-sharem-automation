import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Messaging Tests', () => {
  test('ADV-TC_06 - Send a text message', async ({ homePage, page }) => {
    Logger.info('Starting: Send a text message');
    expect(await homePage.isHomeLoaded()).toBeTruthy();
    await homePage.selectWorkspace('personalDevice');
    const messageText = 'Hello, this is a test message!';
    await homePage.sendMessage(messageText);
    const messages = await page.locator(homePage['messagesList']).allTextContents();
    expect(messages.some(m => m.includes(messageText))).toBeTruthy();
    Logger.info('Test passed: Message sent successfully');
  });

  test('ADV-TC_07 - Send message using Enter key', async ({ homePage, page }) => {
    Logger.info('Starting: Send message using Enter key');
    const messageText = 'Message sent via Enter key';
    await homePage.sendMessageViaEnter(messageText);
    const messages = await page.locator(homePage['messagesList']).allTextContents();
    expect(messages.some(m => m.includes(messageText))).toBeTruthy();
    Logger.info('Test passed: Message sent via Enter key');
  });

  test('ADV-TC_14 - Verify message persistence after refresh', async ({ page, homePage }) => {
    Logger.info('Starting: Message persistence after refresh');
    const uniqueMsg = `Test message persistence ${Date.now()}`;
    await homePage.sendMessage(uniqueMsg);
    
    await page.reload();
    await homePage.waitForElement(homePage['homeTitle']);
    await page.waitForTimeout(1000);
    
    const messages = await page.locator(homePage['messagesList']).allTextContents();
    expect(messages.some(m => m.includes(uniqueMsg))).toBeTruthy();
    Logger.info('Test passed: Messages persisted after refresh');
  });

  test('ADV-TC_24 - Send message while switching workspaces', async ({ homePage, page }) => {
    Logger.info('Starting: Send message while switching workspaces');
    await homePage.selectWorkspace('clientLaptop');
    const messageText = 'Test from Client Laptop';
    await homePage.sendMessage(messageText);
    const messages = await page.locator(homePage['messagesList']).allTextContents();
    expect(messages.some(m => m.includes(messageText))).toBeTruthy();
    await homePage.selectWorkspace('personalDevice');
    const message2 = 'Test from Personal Device';
    await homePage.sendMessage(message2);
    const messages2 = await page.locator(homePage['messagesList']).allTextContents();
    expect(messages2.some(m => m.includes(message2))).toBeTruthy();
    Logger.info('Test passed: Messages sent correctly from different workspaces');
  });
});