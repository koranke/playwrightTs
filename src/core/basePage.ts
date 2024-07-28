import { Page } from "@playwright/test";
import assert from "assert";
import { get } from "http";

export class BasePage<T> {
    page: Page
    path: string
    url: string

    constructor(page: Page, baseUrl: string, path: string) {
        this.page = page
        this.path = path
        this.url = `${baseUrl}${path}`
    }

    async goTo() {
        await this.page.goto(this.url)
    }

    // goTo(): AwaitVoid {
    //     this.page.goto(this.url)
    // }

    // goTo(): void {
    //     this.page.goto(this.url)
    //         .then(() => {
    //             console.log('Navigation successful');
    //         })
    //         .catch((error) => {
    //             console.error('Navigation failed', error);
    //         });
    // }

    async getPageUrl(): Promise<string> {
        return await this.page.url()
    }

    // getPageUrl(): AwaitString {
    //     return this.page.url()
    // }

    async isOpen(): Promise<boolean> {
        let timeout: number = 100
        while (this.page.url() !== this.url) {
            await this.page.waitForTimeout(timeout)
            timeout *= 2
            if (timeout > 2400) {
                break
            }
        }
        return this.page.url() === this.url
    }

    async assertIsOpen() {
        assert.strictEqual(await this.isOpen(), true)
    }

    // isOpen(): AwaitBoolean {
    //     let timeout: number = 100
    //     while (this.page.url() !== this.url) {
    //         this.page.waitForTimeout(timeout).then(() => {})
    //         timeout *= 2
    //         if (timeout > 2400) {
    //             break
    //         }
    //     }
    //     return this.page.url() === this.url
    // }

    // async assertIsOpen() {
    //     assert.strictEqual(await this.isOpen(), true)
    // }

}

// type AsyncReturnType<T extends (...args: any[]) => Promise<any>> =
// T extends (...args: any[]) => Promise<infer R> ? R : never;

// // Example usage:
// type AwaitString = AsyncReturnType<() => Promise<string>>;
// type AwaitBoolean = AsyncReturnType<() => Promise<boolean>>;
// type AwaitVoid = AsyncReturnType<() => Promise<void>>;
