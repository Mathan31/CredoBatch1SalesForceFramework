import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/basePage';
import { ElementActions } from '../wrappers/elementActions';

export class DashboardPage extends BasePage {
  private elementActions: ElementActions;
  private btnAppLauncher: Locator;
  private btnViewAll: Locator;

  constructor(page: Page) {
    super(page);
    this.elementActions = new ElementActions(page);
    this.btnAppLauncher = page.locator('button[title="App Launcher"]');
    this.btnViewAll = page.locator("//button[text()='View All']");
  }

  async clickAppLauncher(): Promise<void> {
    await this.elementActions.click(this.btnAppLauncher);
  }

  async clickViewAll(): Promise<void> {
    await this.elementActions.click(this.btnViewAll);
  }
}