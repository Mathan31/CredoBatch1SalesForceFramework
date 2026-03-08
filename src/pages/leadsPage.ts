import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/basePage';
import { ElementActions } from '../wrappers/elementActions';
import { WaitActions } from '../wrappers/waitActions';
import { ExpectUtil } from '../utils/expectUtil';

export class LeadsPage extends BasePage {
  private elementActions: ElementActions;
  private waitActions: WaitActions;
  private txtNewButton: Locator;
  private txtLastName: Locator;
  private txtCompany: Locator;
  private btnSave: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.elementActions = new ElementActions(page);
    this.waitActions = new WaitActions(page);
    this.txtNewButton = page.locator("//div[text()='New']");
    this.txtLastName = page.locator('input[placeholder="Last Name"]');
    this.txtCompany = page.locator("//input[@name='Company']");
    this.btnSave = page.locator("(//button[text()='Save'])[2]");
    this.successMessage = page.locator("//span[@data-aura-class='forceActionsText']");
  }

  async clickNewButton(): Promise<void> {
    await this.elementActions.click(this.txtNewButton);
  }

  async fillMandatoryFields(lastName: string, company: string, leadStatus?: string): Promise<void> {
    await this.elementActions.type(this.txtLastName, lastName);
    await this.elementActions.type(this.txtCompany, company);
    
  }

  async clickSave(): Promise<void> {
    await this.elementActions.click(this.btnSave);
  }

  async validateLeadCreation(): Promise<boolean> {
    await this.waitActions.waitForVisibility(this.successMessage);
    if (await this.successMessage.isVisible()) {
      return true;
    }else{
      throw new Error('Lead creation failed: Success message not visible');
    }
  }
}