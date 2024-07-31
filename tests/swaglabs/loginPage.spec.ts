import { test } from '../../src/swaglabs/fixtures/siteFixture'
import { LoginPage } from '../../src/swaglabs/pages/loginPage'

test.describe('Login Page', () => {
    test('should be able to open page', async({site}) => {
        const loginPage: LoginPage = await site.loginPage.goTo()
        await loginPage.assertIsOpen()
    })

    test('should be able see basic controls and set values', async({site}) => {
        const loginPage: LoginPage = await site.loginPage.goTo()
        await loginPage.textboxUsername.setText('standard_user')
        await loginPage.textboxPassword.setText('secret_sauce')
        await loginPage.buttonLogin.assertIsEnabled()
        await loginPage.buttonLogin.assertText('Login')
    })

    test('should be able to login with valid credentials', async({site}) => {
        await site.loginPage.signIn('standard_user', 'secret_sauce')
        site.productsPage.assertIsOpen()
    })

    const invalidCredentials = [
        {username: 'standard_user', password: 'invalid', errorMessage: "Username and password do not match any user in this service"},
        {username: 'standard_user', password: '', errorMessage: "Password is required"},
    ]    

    invalidCredentials.forEach(({username, password, errorMessage}) => {
        test(`should not be able to login with invalid credentials: ${username} / ${password}`, async({site}) => {
            const loginPage: LoginPage = await site.loginPage.signIn(username, password)
            loginPage.labelError.assertTextContains(errorMessage)
        })
    })

})