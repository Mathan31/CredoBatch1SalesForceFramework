import { Page, expect,Locator } from '@playwright/test';
import { ExceptionUtil } from '../utils/exceptionUtil';

export class ElementActions { 
  constructor(private page: Page) {}

  async getPageTitle(): Promise<string> {
    try {
      return await this.page.title();
    } catch (error) {
      await ExceptionUtil.handleException(error as Error, this.page);
    }
    return '';
  }

  async click(locator: Locator): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await expect(locator).toBeEnabled();
      await locator.click();
    } catch (error) {
      await ExceptionUtil.handleException(error as Error, this.page);
    }
  }

  async type(locator: Locator, text: string): Promise<void> {
    try {
      await locator.waitFor({state: 'attached'});
      await locator.waitFor({ state: 'visible' });
      await locator.fill(text);
    } catch (error) {
      await ExceptionUtil.handleException(error as Error, this.page);
    }
  }

  async select(locator: Locator, value: string): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible' });
      await locator.selectOption(value);
    } catch (error) {
      await ExceptionUtil.handleException(error as Error, this.page);
    }
  }

  async getTextContent(locator: Locator): Promise<string | null> {
    try {
      await locator.waitFor({ state: 'visible' });
      await expect(locator).toBeEnabled();
      return await locator.textContent();
    } catch (error) {
      await ExceptionUtil.handleException(error as Error, this.page);
    }
    return null;
  }
}