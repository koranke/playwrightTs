import { BasePage } from "../../core/basePage"
import { SauceDemoSite } from "./sauceDemoSite"

export class BaseSauceDemoPage<T> extends BasePage<T> {
    protected site: SauceDemoSite

    constructor(path: string, site: SauceDemoSite) {
        super(site.page, 'https://www.saucedemo.com/', path)
        this.site = site
    }

    public async open(): Promise<T> {
        await this.loginIfNeeded()
        return await this.goTo()
    }

    protected async loginIfNeeded() {
        if (!this.site.isSignedIn) {
            await this.site.loginPage.signInWithDefaultCredentials()
        }
    }
}