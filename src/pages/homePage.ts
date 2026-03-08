import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/basePage';
import { ElementActions } from '../wrappers/elementActions';

export class HomePage extends BasePage {
  private elementActions: ElementActions;
  private btnSales: Locator;
  private btnLeads: Locator;

  constructor(page: Page) {
    super(page);
    this.elementActions = new ElementActions(page);
    this.btnSales = page.locator("//span/p[text()='Sales']");
    this.btnLeads = page.locator('a[title="Leads"]');
  }

  async clickSales(): Promise<void> {
    await this.elementActions.click(this.btnSales);
  }

  async clickLeads(): Promise<void> {
    await this.elementActions.click(this.btnLeads);
  }
}