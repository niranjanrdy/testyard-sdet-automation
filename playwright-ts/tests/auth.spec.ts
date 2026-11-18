import {test, expect} from '@playwright/test';
    // Application under test (AUT)
    const AUT_URL = 'https://testyard.onrender.com/practice/auth';

    // Public demo credentials provided by TestYard
    const DEMO_USER = {
        email: 'practice@testyard.dev',
        password : 'SecretPass1!'
    };
/**
 * Test Case ID: TC_AUTH_001
 * Test Scenario: Verify succesful user Login and Logout functionality
 *
 * Preconditions:
 * - TestYard authentication page is accessible.
 * - The public demo account  is available
 *
 * Expected Results:
 * - User should be able to login successfully with valid credentials.
 * - Correct user information should be displayed after login.
 * - User should be able to logout successfully and be redirected to the login page.
 */
test('TC_AUTH_001 - Verify successful login and logout', async ({page}) => {
    // Step 1   : Navigate to the authentication page
    await test.step('Open TestYard login page', async () => {
        await page.goto(AUT_URL, {timeout: 60000});
});
    // Step 2  : Enter valid credentials and submit the login form
    await test.step('Login with valid credentials ', async () => {
        // Locate form inputs using stable data-testid attributes and fill in the credentials
        const emailInput = page.getByTestId('login-email');
        const passwordInput = page.getByTestId('login-password');

        await emailInput.fill(DEMO_USER.email);
        await passwordInput.fill(DEMO_USER.password);

        // Submit the authentication form by clicking the login button
        await page.getByRole('button',{ name: 'Log in'}).click();
    });
    // Step 3  : Verify the correct account is authenticated
    await test.step('Verify successful user login', async () => {

        // Profile should be visible only in the logged-in state
        await expect(page.getByTestId('profile-email')).toBeVisible();
        // Confirm that the displayed account matches our test user
        await expect(page.getByTestId('profile-email')).toHaveText(DEMO_USER.email);
    });
    // Step 4 End the authenticated session
    await test.step('Logout from TestYard', async ()=> {

        await page.getByRole('button',{name:'Log out'}).click();

    });
    // Step 5 Verify the application returned to the Logged-out state
    await test.step('Verify successful logout', async ()=>{
          //await expect(
      //page.getByRole('button', { name: 'Log in' })
    //).toBeVisible();
        await expect(
            page.getByTestId('login-submit')
        ).toBeVisible();

        await expect(
            page.getByTestId('profile-email')
        ).toHaveCount(0);
    });
// Temporary debugging breakpoint
//await page.pause();
});