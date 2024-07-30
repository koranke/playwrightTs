import { Page } from "@playwright/test"
import { BasePage } from "../../core/basePage"
import { SauceDemoSite } from "./SauceDemoSite"

export class BaseSauceDemoPage<T> extends BasePage<T> {
    protected site: SauceDemoSite

    constructor(path: string, site: SauceDemoSite) {
        super(site.page, 'https://www.saucedemo.com/', path)
        this.site = site
    }

    public async open() {
        await this.loginIfNeeded()
        await this.goTo()
    }

    protected async loginIfNeeded() {
        if (!this.site.isSignedIn) {
            await this.site.loginPage().signInWithDefaultCredentials()
        }
    }
}