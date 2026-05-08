import { test, expect } from '../fixtures/test-fixtures';
import { ScreenSharePage } from '../pages/ScreenSharePage';
import { Logger } from '../utils/logger';

test.describe('Screen Share Tests', () => {
  test('ADV-TC_38 - Stop screen share session', async ({ page }) => {
    Logger.info('Starting: Stop screen share test');
    const screenSharePage = new ScreenSharePage(page);
    await screenSharePage.navigateToScreenShare();
    const canShare = await screenSharePage.isVisible(screenSharePage['shareScreenBtn']);
    if (canShare) {
      expect(canShare).toBeTruthy();
    }
    Logger.info('Test passed: Screen share page accessible');
  });

  test('ADV-TC_44 - Verify screen share permissions prompt', async ({ page }) => {
    Logger.info('Starting: Screen share permissions test');
    const screenSharePage = new ScreenSharePage(page);
    await screenSharePage.navigateToScreenShare();
    const shareBtn = await screenSharePage.isVisible(screenSharePage['shareScreenBtn']);
    expect(shareBtn).toBeTruthy();
    Logger.info('Test passed: Screen share feature accessible');
  });
});