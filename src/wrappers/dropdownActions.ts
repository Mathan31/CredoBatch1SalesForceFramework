import { Page } from '@playwright/test';
import { ExceptionUtil } from '../utils/exceptionUtil';

export class DropdownActions {
  constructor(private page: Page) {}

  async selectByText(selector: string, text: string): Promise<void> {
    try {
      await this.page.selectOption(selector, { label: text });
    } catch (error) {
      await ExceptionUtil.handleException(error as Error, this.page);
    }
  }
}