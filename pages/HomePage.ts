import { expect, Locator, Page, test } from "@playwright/test";
import { BasePages } from "./BasePages";

export class HomePage extends BasePages {
    readonly logo: Locator;
    readonly signupLoginLink: Locator;  

    constructor(page: Page) { 
        super(page);
        this.logo = page.getByRole('link', { name: 'Website for automation' });
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    }

    async clickSignupLogin() {
        await test.step('Click Signup / Login link', async () => {
            await test.step('Assert: Home page logo is visible', async () => {
                await expect(this.logo).toBeVisible();
            });
            await test.step('Action: Click Signup / Login', async () => {
                await this.signupLoginLink.click();
            });
        });
    }

}
