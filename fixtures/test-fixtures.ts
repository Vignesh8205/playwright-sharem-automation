import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ScreenSharePage } from '../pages/ScreenSharePage';
import { config } from '../config/config';

type TestFixtures = {
  homePage: HomePage;
  screenSharePage: ScreenSharePage;
  baseUrl: string;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo(config.baseUrl);
    await use(homePage);
  },

  screenSharePage: async ({ page }, use) => {
    const screenSharePage = new ScreenSharePage(page);
    await use(screenSharePage);
  },

  baseUrl: async ({}, use) => {
    await use(config.baseUrl);
  },
});

export { expect } from '@playwright/test';