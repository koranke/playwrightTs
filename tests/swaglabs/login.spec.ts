import { test, expect } from '../../src/swaglabs/fixtures/siteFixture'
import { LoginPage } from '../../src/swaglabs/pages/loginPage'

test.describe('Login Page', () => {
    test('should be able to open page', async({site}) => {
        const loginPage: LoginPage = site.loginPage()
        await loginPage.open()
        await loginPage.assertIsOpen()

        let url: string = await loginPage.getPageUrl()
        expect(url).toBe('https://www.saucedemo.com/')
    })

    test('should be able see basic controls and set values', async({site}) => {
        const loginPage: LoginPage = site.loginPage()
        await loginPage.open()
        await loginPage.textboxUsername.setText('standard_user')
        await loginPage.textboxPassword.setText('secret_sauce')
        await loginPage.buttonLogin.assertIsEnabled()
        await loginPage.buttonLogin.assertText('Login')
    })

    test('should be able to login with valid credentials', async({site}) => {
        const loginPage: LoginPage = site.loginPage()
        await loginPage.signIn('standard_user', 'secret_sauce')
        site.productsPage().assertIsOpen()
    })
})