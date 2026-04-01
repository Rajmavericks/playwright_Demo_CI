import { expect, Locator, Page, test } from "@playwright/test";
import { BasePages } from "./BasePages";

export class RegisterFormPage extends BasePages {
    readonly pageEAItitle: Locator;
    readonly title: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly DayOfBirthInput: Locator;
    readonly MonthOfBirthInput: Locator;
    readonly YearOfBirthInput: Locator;
    readonly newsletterCheckbox: Locator;
    readonly offersCheckbox: Locator;
    readonly createAccountButton: Locator;  
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly countryInput: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;    


    constructor(page: Page) {
        super(page);
        this.pageEAItitle = page.getByRole('heading', { name: 'Enter Account Information' });
        this.title = page.getByRole('radio', { name: 'Mr.' });
        this.nameInput = page.getByRole('textbox', { name: 'Name' });
        this.emailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.DayOfBirthInput = page.locator('#days');
        this.MonthOfBirthInput = page.locator('#months');
        this.YearOfBirthInput = page.locator('#years');
        this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
        this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
        this.addressInput = page.getByRole('textbox', { name: 'Address *' });
        this.countryInput = page.getByRole('combobox', { name: 'Country *' });
        this.stateInput = page.getByRole('textbox', { name: 'State *' });
        this.cityInput = page.getByRole('textbox', { name: 'City *' });
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    }

    async fillRegistrationForm(userData: any): Promise<void> {
        await test.step('Fill registration form', async () => {
            await test.step('Assert: Enter Account Information heading is visible', async () => {
                await expect(this.pageEAItitle).toBeVisible();
            });

            await test.step('Action: Fill account credentials', async () => {
                await test.step('Action: Fill password', async () => {
                    await this.passwordInput.fill(String(userData.password));
                });
                await test.step('Action: Select title (Mr./Mrs.)', async () => {
                    await this.title.check({ force: true }).catch(() => {});
                    if (userData.title) {
                        await this.page.getByRole('radio', { name: userData.title }).check();
                    }
                });
                await test.step('Action: Select date of birth', async () => {
                    await this.DayOfBirthInput.selectOption(String(userData.day || userData.dayOfBirth));
                    await this.MonthOfBirthInput.selectOption(String(userData.month || userData.monthOfBirth));
                    await this.YearOfBirthInput.selectOption(String(userData.year || userData.yearOfBirth));
                });
                await test.step('Action: Check newsletter and offers checkboxes', async () => {
                    if (userData.newsletter) {
                        await this.newsletterCheckbox.check();
                    }
                    if (userData.offers) {
                        await this.offersCheckbox.check();
                    }
                });
            });

            await test.step('Action: Fill personal information', async () => {
                await test.step('Action: Fill first name', async () => {
                    await this.firstNameInput.fill(String(userData.firstName));
                });
                await test.step('Action: Fill last name', async () => {
                    await this.lastNameInput.fill(String(userData.lastName));
                });
                await test.step('Action: Fill company', async () => {
                    await this.companyInput.fill(String(userData.company));
                });
            });

            await test.step('Action: Fill address information', async () => {
                await test.step('Action: Fill address', async () => {
                    await this.addressInput.fill(String(userData.address1 || userData.address));
                });
                await test.step('Action: Select country', async () => {
                    if (userData.country) {
                        await this.countryInput.selectOption(String(userData.country));
                    }
                });
                await test.step('Action: Fill state', async () => {
                    await this.stateInput.fill(String(userData.state));
                });
                await test.step('Action: Fill city', async () => {
                    await this.cityInput.fill(String(userData.city));
                });
                await test.step('Action: Fill zipcode', async () => {
                    await this.zipcodeInput.fill(String(userData.zipcode));
                });
                await test.step('Action: Fill mobile number', async () => {
                    await this.mobileNumberInput.fill(String(userData.mobile));
                });
            });

            await test.step('Action: Click Create Account button', async () => {
                await this.createAccountButton.click();
            });
        });
    }

    async validateAccountCreated(): Promise<void> {
        await test.step('Validate account created successfully', async () => {
            await test.step('Assert: Account Created! message is visible', async () => {
                await expect(this.page.getByText('Account Created!')).toBeVisible();
            });
            const continueAction = this.page
                .locator('a:has-text("Continue"), button:has-text("Continue")')
                .first();
            await test.step('Assert: Continue button/link is visible', async () => {
                await expect(continueAction).toBeVisible();
            });
            await test.step('Action: Click Continue', async () => {
                await continueAction.click();
            });
        });
    }
}