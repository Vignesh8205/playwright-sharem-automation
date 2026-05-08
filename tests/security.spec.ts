import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';

test.describe('Security Tests', () => {
  test('ADV-TC_08 - Test XSS vulnerability with script tags', async ({ homePage, page }) => {
    Logger.info('Starting: XSS vulnerability test');
    const xssPayload = '<script>alert("XSS")</script>';
    let alertTriggered = false;
    page.once('dialog', dialog => {
      alertTriggered = true;
      dialog.dismiss();
    });
    await homePage.sendMessage(xssPayload);
    expect(alertTriggered).toBeFalsy();
    const lastMessage = await homePage.getLastMessage();
    expect(lastMessage).toContain('<script>');
    Logger.info('Test passed: XSS payload handled safely');
  });

  test('ADV-TC_09 - Verify HTTPS enforcement', async ({ page, baseUrl }) => {
    Logger.info('Starting: HTTPS enforcement test');
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/^https:\/\//);
    Logger.info('Test passed: HTTPS is enforced');
  });

  test('ADV-TC_10 - Test SQL injection attempt in message', async ({ homePage }) => {
    Logger.info('Starting: SQL injection test');
    const sqlPayload = "'; DROP TABLE messages; --";
    await homePage.sendMessage(sqlPayload);
    const lastMessage = await homePage.getLastMessage();
    expect(lastMessage).toContain(sqlPayload);
    const messageCount = await homePage.getMessageCount();
    expect(messageCount).toBeGreaterThan(0);
    Logger.info('Test passed: SQL injection payload handled safely');
  });
});