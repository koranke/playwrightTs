import { Page } from "@playwright/test"
import { Site } from "../../core/site"
import { LoginPage } from "./loginPage"
import { ProductsPage } from "./productsPage"

export class SauceDemoSite extends Site<SauceDemoSite> {
    private _loginPage: LoginPage
    private _productsPage: ProductsPage

    constructor(page: Page) {
        super(page, 'https://www.saucedemo.com/')
    }

    loginPage(): LoginPage {
        if (!this._loginPage) {
            this._loginPage = new LoginPage(this)
        }
        return this._loginPage
    }

    productsPage(): ProductsPage {
        if (!this._productsPage) {
            this._productsPage = new ProductsPage(this)
        }
        return this._productsPage
    }

}