import { expect as baseExpect, test as base } from '@playwright/test';
import { RegisterFormPage } from '../pages/RegisterformPage';

import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/Signup_LoginPage';

type CustomFixtures = {
  registerFormPage: RegisterFormPage;
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
};

export const test = base.extend<CustomFixtures>({
  registerFormPage: async ({ page }, use) => {
    const registerFormPage = new RegisterFormPage(page);
    await use(registerFormPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  signupLoginPage: async ({ page }, use) => {
    const signupPage = new SignupLoginPage(page);
    await use(signupPage);
  },
});

// Launch the base URL before each test
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// Cleanup after each test: logout if logged in
test.afterEach(async ({ page }) => {
  const logoutLink = page.getByRole('link', { name: 'Logout' });
  const isLoggedIn = await logoutLink.isVisible({ timeout: 2000 }).catch(() => false);

  if (!isLoggedIn) {
    return;
  }

  try {
    await logoutLink.click({ timeout: 5000 });
    await baseExpect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible({
      timeout: 5000,
    });
  } catch (error) {
    // Cleanup should not mask test failures; keep a warning for troubleshooting.
    console.warn('Post-test logout cleanup failed:', error);
  }
});

export const expect = baseExpect;
