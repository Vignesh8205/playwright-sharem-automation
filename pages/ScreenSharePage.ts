import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ScreenSharePage extends BasePage {
  readonly shareScreenBtn = 'button:has-text("Screen Share")';
  readonly loginBtn = 'button:has-text("Login")';
  readonly stopSharingBtn = 'button:has-text("Stop Sharing")';
  readonly screenShareContainer = '.screen-share-container';
  readonly participantsList = '.participants-list';
  readonly permissionDialog = '.permission-dialog';
  readonly allowPermissionBtn = 'button:has-text("Allow")';
  readonly denyPermissionBtn = 'button:has-text("Deny")';
  readonly screenSelector = 'select[name="screen"]';
  readonly screenQualityIndicator = '.quality-indicator';
  readonly screenFrame = 'video[class*="screen"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToScreenShare(): Promise<void> {
    await this.navigateTo('/screen-share');
  }

  async initiateScreenShare(): Promise<void> {
    await this.waitAndClick(this.shareScreenBtn);
  }

  async stopScreenShare(): Promise<void> {
    await this.waitAndClick(this.stopSharingBtn);
  }

  async isScreenShareActive(): Promise<boolean> {
    return await this.isVisible(this.stopSharingBtn);
  }

  async isScreenFrameVisible(): Promise<boolean> {
    return await this.isVisible(this.screenFrame);
  }

  async getParticipantCount(): Promise<number> {
    return await this.page.locator('.participant-item').count();
  }

  async isQualityIndicatorVisible(): Promise<boolean> {
    return await this.isVisible(this.screenQualityIndicator);
  }

  async selectScreen(screenIndex: number): Promise<void> {
    await this.click(this.screenSelector);
    const options = this.page.locator(`${this.screenSelector} option`);
    await options.nth(screenIndex).click();
  }

  async waitForPermissionDialog(): Promise<boolean> {
    try {
      await this.page.waitForSelector(this.permissionDialog, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async allowScreenSharePermission(): Promise<void> {
    if (await this.waitForPermissionDialog()) {
      await this.click(this.allowPermissionBtn);
    }
  }

  async denyScreenSharePermission(): Promise<void> {
    if (await this.waitForPermissionDialog()) {
      await this.click(this.denyPermissionBtn);
    }
  }
}