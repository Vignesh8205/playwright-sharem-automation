import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly homeTitle = '.sidebar-logo:has-text("Messager")';
  readonly workspaceSection = 'text=WORKSPACES';
  readonly clientLaptopBtn = 'button:has-text("Client Laptop")';
  readonly personalDeviceBtn = 'button:has-text("Personal Device")';
  readonly messageInput = 'textarea[placeholder="Type or paste message..."]';
  readonly sendButton = 'button.send-btn';
  readonly attachmentBtn = 'button.attachment-btn';
  readonly refreshChatBtn = 'button:has-text("Refresh Chat")';
  readonly clearChatsBtn = 'button:has-text("Clear All Chats")';
  readonly themeToggleBtn = 'button:has-text("Mode")';
  readonly messagesList = '.message-bubble';
  readonly liveIndicator = 'text=Live Link Active';

  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.navigateTo('/');
  }

  async isHomeLoaded(): Promise<boolean> {
    return await this.isVisible(this.homeTitle);
  }

  async verifyLiveIndicator(): Promise<boolean> {
    return await this.isVisible(this.liveIndicator);
  }

  async selectWorkspace(workspace: 'clientLaptop' | 'personalDevice'): Promise<void> {
    const selector = workspace === 'clientLaptop' ? this.clientLaptopBtn : this.personalDeviceBtn;
    await this.waitAndClick(selector);
  }

  async sendMessage(message: string): Promise<void> {
    await this.page.locator(this.messageInput).fill(message, { force: true });
    await this.page.locator(this.sendButton).click({ force: true });
    await this.page.waitForTimeout(500);
  }

  async sendMessageViaEnter(message: string): Promise<void> {
    await this.page.locator(this.messageInput).fill(message, { force: true });
    await this.page.press(this.messageInput, 'Enter');
    await this.page.waitForTimeout(500);
  }

  async getMessageCount(): Promise<number> {
    return await this.page.locator(this.messagesList).count();
  }

  async getLastMessage(): Promise<string> {
    const messages = this.page.locator(this.messagesList);
    const count = await messages.count();
    if (count === 0) return '';
    return await messages.nth(count - 1).textContent() || '';
  }

  async clearAllChats(): Promise<void> {
    await this.waitAndClick(this.clearChatsBtn);
    await this.page.click('button:has-text("OK")');
    await this.page.waitForTimeout(500);
  }

  async toggleTheme(): Promise<void> {
    await this.click(this.themeToggleBtn);
  }

  async refreshChat(): Promise<void> {
    await this.waitAndClick(this.refreshChatBtn);
  }

  async uploadFile(filePath: string): Promise<void> {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }
}