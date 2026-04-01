import { test } from '../fixtures/pages';
import { loadTestData, getValidatedDataForTest, TestDataMap } from '../utils/datahelper';
import { allure } from 'allure-playwright';

let allData: TestDataMap;

test.beforeAll(async () => {
  allData = loadTestData();
});

test('Register User @smoke @regression @auth', async ({ registerFormPage, homePage, signupLoginPage }) => {
  await allure.epic('User Management');
  await allure.feature('Authentication');
  await allure.story('Registration');

  const data = getValidatedDataForTest('Register User', allData);
  const uniqueEmail = String(data.email).replace('@', `+${Date.now()}@`);
  await homePage.clickSignupLogin();
  await signupLoginPage.validateSignupLoginPage();
  await signupLoginPage.registerUser(String(data.name), uniqueEmail);
  await registerFormPage.fillRegistrationForm(data);
  await registerFormPage.validateAccountCreated();
});


test('Invalid User @negative @regression @auth', async ({ homePage, signupLoginPage }) => {
  await allure.epic('User Management');
  await allure.feature('Authentication');
  await allure.story('Invalid Login');

  const data = getValidatedDataForTest('Invalid User', allData);
  await homePage.clickSignupLogin();
  await signupLoginPage.loginUser(String(data.email), String(data.password));
  await signupLoginPage.validateLoginError();
});