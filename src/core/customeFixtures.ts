import { test as base,BrowserContext,Page} from '@playwright/test';
import { BrowserFactory } from './browserFactory';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { HomePage } from '../pages/homePage';
import { LeadsPage } from '../pages/leadsPage';

 interface CustomFixtures {
  context: BrowserContext;
  page: Page;
  loginPage: LoginPage; 
  dashboardPage: DashboardPage;
  homePage: HomePage;
  leadsPage: LeadsPage;
}

export const test = base.extend<CustomFixtures>({
  context: async ({}, use) => {
    const context = await BrowserFactory.createBrowserWithPersistence();
    await use(context);
    //await context.close();
   },
  page: async ({ context }, use) => {
    const pages = context.pages();
    const page = pages.length > 0 ? pages[0] : await context.newPage();
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  leadsPage: async ({ page }, use) => {
    await use(new LeadsPage(page));
  },
});

