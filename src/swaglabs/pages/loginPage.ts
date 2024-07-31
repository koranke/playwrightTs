import { Button, Label, TextBox } from "../../internal"
import { BaseSauceDemoPage } from "./baseSauceDemoPage"
import { SauceDemoSite } from "./sauceDemoSite"

export class LoginPage extends BaseSauceDemoPage<LoginPage> {
    textboxUsername: TextBox
    textboxPassword: TextBox
    labelError: Label
    buttonLogin: Button

    constructor(site: SauceDemoSite) {
        super("", site)

        this.textboxUsername = new TextBox(this.page.locator('#user-name'))
        this.textboxPassword = new TextBox(this.page.locator('#password'))
        this.labelError = new Label(this.page.locator('css=[data-test="error"]'))
        this.buttonLogin = new Button(this.page.getByRole('button', { name: 'Login' }))
    }

    async signIn(username: string, password: string): Promise<LoginPage> {
        await this.goTo()
        await this.textboxUsername.setText(username)
        await this.textboxPassword.setText(password)
        await this.buttonLogin.click()
        this.site.isSignedIn = true
        return this
    }
    
    async signInWithDefaultCredentials(): Promise<LoginPage> {
        return await this.signIn('standard_user', 'secret_sauce')
    }

}