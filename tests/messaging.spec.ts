import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Messaging Tests', () => {
  test('ADV-TC_06 - Send a text message', async ({ homePage }) => {
    Logger.info('Starting: Send a text message');
    expect(await homePage.isHomeLoaded()).toBeTruthy();
    await homePage.selectWorkspace('personalDevice');
    const messageText = 'Hello, this is a test message!';
    await homePage.sendMessage(messageText);
    const lastMessage = await homePage.getLastMessage();
    expect(lastMessage).toContain(messageText);
    Logger.info('Test passed: Message sent successfully');
  });

  test('ADV-TC_07 - Send message using Enter key', async ({ homePage }) => {
    Logger.info('Starting: Send message using Enter key');
    const messageText = 'Message sent via Enter key';
    await homePage.sendMessageViaEnter(messageText);
    const lastMessage = await homePage.getLastMessage();
    expect(lastMessage).toContain(messageText);
    Logger.info('Test passed: Message sent via Enter key');
  });

  test('ADV-TC_14 - Verify message persistence after refresh', async ({ page, homePage }) => {
    Logger.info('Starting: Message persistence after refresh');
    await homePage.sendMessage('Test message 1');
    await homePage.sendMessage('Test message 2');
    await homePage.sendMessage('Test message 3');
    const messageCountBefore = await homePage.getMessageCount();
    await page.reload();
    await homePage.waitForElement(homePage['homeTitle']);
    const messageCountAfter = await homePage.getMessageCount();
    expect(messageCountAfter).toBeGreaterThanOrEqual(messageCountBefore);
    Logger.info('Test passed: Messages persisted after refresh');
  });

  test('ADV-TC_24 - Send message while switching workspaces', async ({ homePage }) => {
    Logger.info('Starting: Send message while switching workspaces');
    await homePage.selectWorkspace('clientLaptop');
    const messageText = 'Test from Client Laptop';
    await homePage.sendMessage(messageText);
    const lastMessage = await homePage.getLastMessage();
    expect(lastMessage).toContain(messageText);
    await homePage.selectWorkspace('personalDevice');
    const message2 = 'Test from Personal Device';
    await homePage.sendMessage(message2);
    const lastMessage2 = await homePage.getLastMessage();
    expect(lastMessage2).toContain(message2);
    Logger.info('Test passed: Messages sent correctly from different workspaces');
  });
});