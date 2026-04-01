import { type Page, type Locator, test } from '@playwright/test';

export class BasePages {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await test.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  async getElementText(locator: Locator): Promise<string> {
    return await test.step('Get element text', async () => {
      return await locator.textContent() || '';
    });
  }

}
