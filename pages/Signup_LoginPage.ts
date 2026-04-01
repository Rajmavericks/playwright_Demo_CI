import { expect, Locator, Page, test } from '@playwright/test';
import { BasePages } from "./BasePages";    

export class SignupLoginPage extends BasePages {
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly loginEmailInput: Locator;
    readonly signupButton: Locator;
    readonly loginButton: Locator;
    readonly passwordInput: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.loginEmailInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.passwordInput = page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Password');
    }

    async validateSignupLoginPage(): Promise<void> {
        await test.step('Validate Signup/Login page elements are visible', async () => {
            await test.step('Assert: Name input is visible', async () => {
                await expect(this.nameInput).toBeVisible();
            });
            await test.step('Assert: Signup email input is visible', async () => {
                await expect(this.emailInput).toBeVisible();
            });
            await test.step('Assert: Signup button is visible', async () => {
                await expect(this.signupButton).toBeVisible();
            });
            await test.step('Assert: Password input is visible', async () => {
                await expect(this.passwordInput).toBeVisible();
            });
            await test.step('Assert: Login button is visible', async () => {
                await expect(this.loginButton).toBeVisible();
            });
        });
    }

    async registerUser(name: string, email: string): Promise<void> {
        await test.step(`Register new user: ${name}`, async () => {
            await test.step('Action: Fill name field', async () => {
                await this.nameInput.fill(name);
            });
            await test.step('Action: Fill email field', async () => {
                await this.emailInput.fill(email);
            });
            await test.step('Action: Click Signup button', async () => {
                await this.signupButton.click();
            });
        });
    }

    async loginUser(email: string, password: string): Promise<void> {
        await test.step('Login with credentials', async () => {
            await test.step('Action: Fill login email', async () => {
                await this.loginEmailInput.fill(email);
            });
            await test.step('Action: Fill password', async () => {
                await this.passwordInput.fill(password);
            });
            await test.step('Action: Click Login button', async () => {
                await this.loginButton.click();
            });
        });
    }

    async validateLoginError(): Promise<void> {
        await test.step('Validate login error message', async () => {
            await test.step('Assert: Invalid credentials error is visible', async () => {
                await expect(this.page.getByText('Your email or password is')).toBeVisible();
            });
        });
    }
}

