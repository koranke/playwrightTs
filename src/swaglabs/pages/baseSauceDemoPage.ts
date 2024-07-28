import { Page } from "@playwright/test"
import { BasePage } from "../../core/basePage"

export class BaseSauceDemoPage<T> extends BasePage<T> {

    constructor(path: string, page: Page) {
        super(page, 'https://www.saucedemo.com/', path)
    }

    public async open() {
        this.loginIfNeeded()
        await this.goTo()
    }

    // public open(): void {
    //     // this.loginIfNeeded()
    //     // this.goTo()
    //     this.page.goto(this.url)
    //         .then(() => {
    //             console.log('Navigation successful');
    //         })
    //         .catch((error: any) => {
    //             console.error('Navigation failed', error);
    //         });
    // }

    protected loginIfNeeded() {

    }
}