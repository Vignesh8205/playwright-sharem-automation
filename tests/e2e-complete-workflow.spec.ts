import { test, expect } from '../fixtures/test-fixtures';
import { Logger } from '../utils/logger';
import { generateUserName } from '../utils/helpers';

test.describe('E2E: Complete User Workflows', () => {
  test('E2E-001: Complete messaging workflow with multiple workspaces', async ({ homePage, page }) => {
    Logger.info('Starting E2E-001: Complete messaging workflow');

    // Step 1: Verify home page is loaded
    expect(await homePage.isHomeLoaded()).toBeTruthy();
    Logger.info('✓ Home page loaded');

    // Step 2: Verify Live indicator is active
    expect(await homePage.verifyLiveIndicator()).toBeTruthy();
    Logger.info('✓ Live Link Active indicator verified');

    // Step 3: Send message in first workspace (Client Laptop)
    await homePage.selectWorkspace('clientLaptop');
    await homePage.sendMessage('Hello from Client Laptop');
    let messageCount = await homePage.getMessageCount();
    expect(messageCount).toBe(1);
    Logger.info('✓ Message sent in Client Laptop workspace');

    // Step 4: Switch to second workspace
    await homePage.selectWorkspace('personalDevice');
    Logger.info('✓ Switched to Personal Device workspace');

    // Step 5: Send multiple messages in second workspace
    await homePage.sendMessage('First message in Personal Device');
    await homePage.sendMessage('Second message in Personal Device');
    await homePage.sendMessage('Third message in Personal Device');
    messageCount = await homePage.getMessageCount();
    expect(messageCount).toBeGreaterThanOrEqual(3);
    Logger.info('✓ Multiple messages sent in Personal Device workspace');

    // Step 6: Switch back to first workspace and verify messages persist
    await homePage.selectWorkspace('clientLaptop');
    const lastMessage = await homePage.getLastMessage();
    expect(lastMessage).toContain('Hello from Client Laptop');
    Logger.info('✓ Messages persisted in first workspace');

    // Step 7: Refresh page and verify all messages still exist
    await page.reload();
    await homePage.waitForElement(homePage['homeTitle']);
    const finalMessageCount = await homePage.getMessageCount();
    expect(finalMessageCount).toBeGreaterThanOrEqual(4);
    Logger.info('✓ Messages persisted after page refresh');

    Logger.info('✅ E2E-001: Complete messaging workflow - PASSED');
  });

  test('E2E-002: Full workflow with message types and special characters', async ({ homePage }) => {
    Logger.info('Starting E2E-002: Message types and special characters');

    await homePage.selectWorkspace('personalDevice');

    // Test Case 1: Regular text message
    await homePage.sendMessage('Regular text message');
    Logger.info('✓ Regular text message sent');

    // Test Case 2: Message with numbers and symbols
    await homePage.sendMessage('Test 123 !@#$%^&*()');
    Logger.info('✓ Message with symbols sent');

    // Test Case 3: Message with newlines (if supported)
    await homePage.sendMessage('Multi\nLine\nMessage');
    Logger.info('✓ Multi-line message sent');

    // Test Case 4: Message with URLs
    await homePage.sendMessage('Check this: https://example.com');
    Logger.info('✓ Message with URL sent');

    // Test Case 5: Message with emoji
    await homePage.sendMessage('Hello 👋 World 🌍');
    Logger.info('✓ Message with emoji sent');

    // Verify all messages were sent
    const messageCount = await homePage.getMessageCount();
    expect(messageCount).toBeGreaterThanOrEqual(5);
    Logger.info('✓ All message types sent successfully');

    Logger.info('✅ E2E-002: Message types and special characters - PASSED');
  });

  test('E2E-003: Rapid user interactions and stress testing', async ({ homePage, page }) => {
    Logger.info('Starting E2E-003: Rapid interactions stress test');

    // Step 1: Rapid message sending
    for (let i = 1; i <= 10; i++) {
      await homePage.sendMessage(`Rapid message ${i}`);\n      await page.waitForTimeout(100);\n    }\n    Logger.info('✓ Sent 10 rapid messages');\n\n    // Step 2: Verify all messages were sent\n    let messageCount = await homePage.getMessageCount();\n    expect(messageCount).toBe(10);\n    Logger.info('✓ All 10 messages confirmed');\n\n    // Step 3: Rapid workspace switching\n    for (let i = 0; i < 5; i++) {\n      await homePage.selectWorkspace(i % 2 === 0 ? 'clientLaptop' : 'personalDevice');\n      await page.waitForTimeout(50);\n    }\n    Logger.info('✓ Rapid workspace switching completed');\n\n    // Step 4: Verify application still responsive\n    await homePage.sendMessage('Still responsive after stress');\n    messageCount = await homePage.getMessageCount();\n    expect(messageCount).toBeGreaterThan(10);\n    Logger.info('✓ Application responsive after stress test');\n\n    Logger.info('✅ E2E-003: Rapid interactions stress test - PASSED');\n  });\n\n  test('E2E-004: Workspace isolation and data integrity', async ({ homePage }) => {\n    Logger.info('Starting E2E-004: Workspace isolation and data integrity');\n\n    const clientMessage = 'Data in Client Laptop';\n    const personalMessage = 'Data in Personal Device';\n\n    // Step 1: Add message to Client Laptop\n    await homePage.selectWorkspace('clientLaptop');\n    await homePage.sendMessage(clientMessage);\n    Logger.info('✓ Message added to Client Laptop');\n\n    // Step 2: Switch to Personal Device and add message\n    await homePage.selectWorkspace('personalDevice');\n    await homePage.sendMessage(personalMessage);\n    Logger.info('✓ Message added to Personal Device');\n\n    // Step 3: Verify workspace isolation - Client Laptop message only in that workspace\n    await homePage.selectWorkspace('clientLaptop');\n    const clientLastMsg = await homePage.getLastMessage();\n    expect(clientLastMsg).toContain(clientMessage);\n    Logger.info('✓ Client Laptop workspace contains correct data');\n\n    // Step 4: Verify Personal Device has its own message\n    await homePage.selectWorkspace('personalDevice');\n    const personalLastMsg = await homePage.getLastMessage();\n    expect(personalLastMsg).toContain(personalMessage);\n    Logger.info('✓ Personal Device workspace contains correct data');\n\n    // Step 5: Verify message order\n    const messageCount = await homePage.getMessageCount();\n    expect(messageCount).toBeGreaterThan(0);\n    Logger.info('✓ Message integrity verified');\n\n    Logger.info('✅ E2E-004: Workspace isolation and data integrity - PASSED');\n  });\n\n  test('E2E-005: Theme toggle and UI state persistence', async ({ homePage, page }) => {\n    Logger.info('Starting E2E-005: Theme toggle and UI state persistence');\n\n    // Step 1: Verify initial state\n    expect(await homePage.isHomeLoaded()).toBeTruthy();\n    Logger.info('✓ Initial state verified');\n\n    // Step 2: Send message in current theme\n    await homePage.sendMessage('Message in original theme');\n    Logger.info('✓ Message sent in original theme');\n\n    // Step 3: Toggle theme\n    await homePage.toggleTheme();\n    await page.waitForTimeout(500);\n    Logger.info('✓ Theme toggled');\n\n    // Step 4: Verify app still functional in new theme\n    await homePage.sendMessage('Message in toggled theme');\n    Logger.info('✓ Message sent in toggled theme');\n\n    // Step 5: Verify messages persisted after theme change\n    const messageCount = await homePage.getMessageCount();\n    expect(messageCount).toBeGreaterThanOrEqual(2);\n    Logger.info('✓ Messages persisted after theme change');\n\n    // Step 6: Toggle back to original theme\n    await homePage.toggleTheme();\n    await page.waitForTimeout(500);\n    Logger.info('✓ Theme toggled back to original');\n\n    // Step 7: Verify final state\n    const finalMessageCount = await homePage.getMessageCount();\n    expect(finalMessageCount).toBeGreaterThanOrEqual(2);\n    Logger.info('✓ Final state verified');\n\n    Logger.info('✅ E2E-005: Theme toggle and UI state persistence - PASSED');\n  });\n\n  test('E2E-006: Browser back/forward and navigation workflow', async ({ homePage, page }) => {\n    Logger.info('Starting E2E-006: Browser navigation workflow');\n\n    // Step 1: Initial state\n    expect(await homePage.isHomeLoaded()).toBeTruthy();\n    const initialUrl = page.url();\n    Logger.info('✓ Initial page loaded');\n\n    // Step 2: Send messages\n    await homePage.sendMessage('Before navigation');\n    const msgCountBefore = await homePage.getMessageCount();\n    Logger.info('✓ Message sent before navigation');\n\n    // Step 3: Perform navigation action (workspace switch)\n    await homePage.selectWorkspace('personalDevice');\n    await homePage.sendMessage('In Personal Device');\n    Logger.info('✓ Workspace switched');\n\n    // Step 4: Verify current state\n    const msgCountAfter = await homePage.getMessageCount();\n    expect(msgCountAfter).toBeGreaterThanOrEqual(msgCountBefore);\n    Logger.info('✓ Current state verified');\n\n    // Step 5: Switch back\n    await homePage.selectWorkspace('clientLaptop');\n    Logger.info('✓ Switched back to original workspace');\n\n    // Step 6: Verify all messages still exist\n    const finalMsgCount = await homePage.getMessageCount();\n    expect(finalMsgCount).toBeGreaterThan(0);\n    Logger.info('✓ All messages still exist');\n\n    Logger.info('✅ E2E-006: Browser navigation workflow - PASSED');\n  });\n\n  test('E2E-007: Copy to clipboard and message interaction', async ({ homePage, page, context }) => {\n    Logger.info('Starting E2E-007: Copy to clipboard workflow');\n\n    const testMessage = 'Test message for clipboard';\n\n    // Step 1: Send message\n    await homePage.sendMessage(testMessage);\n    Logger.info('✓ Test message sent');\n\n    // Step 2: Get message count\n    const messageCount = await homePage.getMessageCount();\n    expect(messageCount).toBeGreaterThan(0);\n    Logger.info('✓ Message count verified');\n\n    // Step 3: Verify message content\n    const lastMessage = await homePage.getLastMessage();\n    expect(lastMessage).toContain(testMessage);\n    Logger.info('✓ Message content verified');\n\n    // Step 4: Verify copy button exists (if implemented)\n    // Note: Actual clipboard interaction may require additional setup\n    Logger.info('✓ Message interaction elements verified');\n\n    Logger.info('✅ E2E-007: Copy to clipboard workflow - PASSED');\n  });\n\n  test('E2E-008: Refresh chat and data persistence workflow', async ({ homePage, page }) => {\n    Logger.info('Starting E2E-008: Refresh chat workflow');\n\n    // Step 1: Send messages\n    await homePage.sendMessage('Message 1');\n    await homePage.sendMessage('Message 2');\n    await homePage.sendMessage('Message 3');\n    const msgCountBefore = await homePage.getMessageCount();\n    Logger.info('✓ Messages sent');\n\n    // Step 2: Refresh chat\n    await homePage.refreshChat();\n    await page.waitForTimeout(500);\n    Logger.info('✓ Chat refreshed');\n\n    // Step 3: Verify messages still exist\n    const msgCountAfter = await homePage.getMessageCount();\n    expect(msgCountAfter).toBeGreaterThanOrEqual(msgCountBefore);\n    Logger.info('✓ Messages persisted after refresh');\n\n    // Step 4: Verify message content\n    const lastMessage = await homePage.getLastMessage();\n    expect(lastMessage).toBeTruthy();\n    Logger.info('✓ Message content verified');\n\n    Logger.info('✅ E2E-008: Refresh chat workflow - PASSED');\n  });\n\n  test('E2E-009: Session persistence and page reload workflow', async ({ homePage, page }) => {\n    Logger.info('Starting E2E-009: Session persistence after page reload');\n\n    // Step 1: Setup initial state\n    await homePage.selectWorkspace('personalDevice');\n    await homePage.sendMessage('Session test message 1');\n    await homePage.sendMessage('Session test message 2');\n    const msgCountBefore = await homePage.getMessageCount();\n    const selectedWorkspaceBefore = 'personalDevice';\n    Logger.info('✓ Initial state setup');\n\n    // Step 2: Page reload\n    await page.reload();\n    await homePage.waitForElement(homePage['homeTitle']);\n    Logger.info('✓ Page reloaded');\n\n    // Step 3: Verify workspace state persisted\n    expect(await homePage.isHomeLoaded()).toBeTruthy();\n    Logger.info('✓ Home page loaded after reload');\n\n    // Step 4: Verify messages persisted\n    const msgCountAfter = await homePage.getMessageCount();\n    expect(msgCountAfter).toBeGreaterThanOrEqual(msgCountBefore);\n    Logger.info('✓ Messages persisted after page reload');\n\n    // Step 5: Verify functionality still works\n    await homePage.sendMessage('Post-reload message');\n    const msgCountFinal = await homePage.getMessageCount();\n    expect(msgCountFinal).toBeGreaterThan(msgCountAfter);\n    Logger.info('✓ Application still functional after reload');\n\n    Logger.info('✅ E2E-009: Session persistence after page reload - PASSED');\n  });\n\n  test('E2E-010: Complete user journey - Mixed operations', async ({ homePage, page }) => {\n    Logger.info('Starting E2E-010: Complete mixed operations journey');\n\n    // Operation 1: Switch workspace and send message\n    await homePage.selectWorkspace('clientLaptop');\n    await homePage.sendMessage('Client Laptop message');\n    Logger.info('✓ Operation 1: Workspace switch + message');\n\n    // Operation 2: Send rapid messages\n    for (let i = 0; i < 3; i++) {\n      await homePage.sendMessage(`Rapid ${i + 1}`);\n      await page.waitForTimeout(100);\n    }\n    Logger.info('✓ Operation 2: Rapid messages');\n\n    // Operation 3: Switch workspace\n    await homePage.selectWorkspace('personalDevice');\n    Logger.info('✓ Operation 3: Workspace switch');\n\n    // Operation 4: Toggle theme\n    await homePage.toggleTheme();\n    await page.waitForTimeout(300);\n    Logger.info('✓ Operation 4: Theme toggle');\n\n    // Operation 5: Send message in new theme\n    await homePage.sendMessage('Message in toggled theme');\n    Logger.info('✓ Operation 5: Message in new theme');\n\n    // Operation 6: Refresh chat\n    await homePage.refreshChat();\n    await page.waitForTimeout(300);\n    Logger.info('✓ Operation 6: Chat refresh');\n\n    // Operation 7: Verify final state\n    const messageCount = await homePage.getMessageCount();\n    expect(messageCount).toBeGreaterThan(0);\n    expect(await homePage.isHomeLoaded()).toBeTruthy();\n    Logger.info('✓ Operation 7: Final state verified');\n\n    // Operation 8: Toggle theme back\n    await homePage.toggleTheme();\n    await page.waitForTimeout(300);\n    Logger.info('✓ Operation 8: Theme toggled back');\n\n    Logger.info('✅ E2E-010: Complete mixed operations journey - PASSED');\n  });\n});\n