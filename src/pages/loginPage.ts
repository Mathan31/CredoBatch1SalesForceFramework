import { Locator, Page } from '@playwright/test';
import { BasePage } from '../core/basePage';
import { ElementActions } from '../wrappers/elementActions';
import { ScreenshotUtil } from '../utils/screenshotUtil';
import { Constants } from '../utils/constants';
import { StringConstants } from '../utils/stringConstance';
import { WaitActions } from '../wrappers/waitActions';
import { ExceptionUtil } from '../utils/exceptionUtil';


export class LoginPage extends BasePage {
  private elementActions: ElementActions;
  private txtUserName: Locator
  private txtPassword: Locator;
  private btnLogin: Locator
  private uiImage: Locator;
  private profileLinkLabel: Locator
  private waitActions: WaitActions;
  private loginErrorMessage: Locator;
  private linkLogout: Locator;
  private loginLogo: Locator;


  constructor(page: Page) {
    super(page);
    this.elementActions = new ElementActions(page);
    this.waitActions = new WaitActions(page);
    this.txtUserName = page.locator('#username');
    this.txtPassword = page.locator('#password');
    this.btnLogin = page.locator('#Login');
    this.uiImage = page.locator("//button//span[@data-aura-class='uiImage']");
    this.profileLinkLabel = page.locator("(//a[@class='profile-link-label'])[1]");
    this.loginErrorMessage = page.locator('#error');
    this.linkLogout = page.locator("//a[text()='Log Out']");
    this.loginLogo = page.locator("#logo");
  }

  async verifyLoginPage(): Promise<boolean> {
    try {
      await this.waitActions.waitForVisibility(this.loginLogo); 
      return await this.loginLogo.isVisible();
    } catch (error) {
      await ExceptionUtil.handleException(error as Error, this.page);
      return false;
    }
  }

  async navigateToLogin(): Promise<void> {
    await this.page.goto(Constants.BASE_URL);
    await this.page.waitForLoadState('domcontentloaded');
    await ScreenshotUtil.takeScreenshot(this.page, 'navigateToLogin-debug');
  }

  async login(username: string, password: string): Promise<void> {
    await this.elementActions.type(this.txtUserName, username);
    await this.elementActions.type(this.txtPassword, password);
    await this.elementActions.click(this.btnLogin);
  }

  async clickProfileImage(): Promise<void> {
    await this.waitActions.waitForAttached(this.uiImage, { state: 'attached' });
    await this.elementActions.click(this.uiImage);
  }

  async verifyLoginSuccess(): Promise<boolean> {
    await this.clickProfileImage();
    const userName = await this.elementActions.getTextContent(this.profileLinkLabel);
    if (userName?.trim() === Constants.EXPECTED_USERNAME) {
      return true;
    } else {
      throw new Error(`Login failed, expected user name: ${Constants.EXPECTED_USERNAME}, but got: ${userName}`);
    }
}

async clickLogout(): Promise<boolean> {
    await this.waitActions.waitForAttached(this.linkLogout, { state: 'attached' });
    await this.elementActions.click(this.linkLogout);
        
    if (await this.verifyLoginPage()) { 
      return true;
    } else {
      throw new Error(`Logout failed: Login page not visible after logout`);
    }
}

  async verifyLoginError(): Promise<boolean> {
    const errorMessage = await this.elementActions.getTextContent(this.loginErrorMessage);
    if (errorMessage?.trim() === StringConstants.LOGIN_ERROR) {
    return true;
    } else {      
      throw new Error(`Login error message mismatch, expected: ${StringConstants.LOGIN_ERROR}, but got: ${errorMessage}`);
    }
}
}