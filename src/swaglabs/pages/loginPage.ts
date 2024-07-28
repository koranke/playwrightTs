import { Page } from "@playwright/test"
import { Button, TextBox } from "../../internal"
import { BaseSauceDemoPage } from "./baseSauceDemoPage"

export class LoginPage extends BaseSauceDemoPage<LoginPage> {
    textboxUsername: TextBox
    textboxPassword: TextBox
    buttonLogin: Button

    constructor(page: Page) {
        super("", page)

        this.textboxUsername = new TextBox(page.locator('#user-name'))
        this.textboxPassword = new TextBox(page.locator('#password'))
        this.buttonLogin = new Button(page.getByRole('button', { name: 'Login' }))
    }

    async signIn(username: string, password: string): Promise<LoginPage> {
        await this.goTo()
        await this.textboxUsername.setText(username)
        await this.textboxPassword.setText(password)
        await this.buttonLogin.click()
        return this
    }
    
    async signInWithDefaultCredentials(): Promise<LoginPage> {
        return this.signIn('standard_user', 'secret_saue')
    }

}