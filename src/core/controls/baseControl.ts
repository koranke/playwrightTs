import { expect, Locator, Page } from "@playwright/test"
import { TextBox, Button } from "../../internal"

export class BaseControl {
    private page: Page
    private timeoutForVisibility: number = 4
    protected locator: Locator
    protected xpath: string
    clickDelay: number = 0

    constructor(locator?: Locator) {
        if (locator) {
            this.locator = locator
        }
    }

    public static usingPageAndXPath(page: Page, xpath: string): BaseControl {
        const cls = new BaseControl()
        cls.page = page
        cls.xpath = xpath
        return cls
    }

    getLocatorForItem(item: string): Locator {
        if (this.locator === null) {
            //todo: xpath needs to be a formatted string that applies the item
            return this.page.locator(`//${this.xpath}//${item}`)
        } else {
            return this.locator
        }
    }

    getLocator(): Locator {
        if (this.locator === null) {
            return this.page.locator(this.xpath)
        } else {
            return this.locator
        }
    }

    async isEnable(): Promise<boolean> {
        return await this.locator.isEnabled()
    }

    async assertIsEnabled(): Promise<void> {
        expect(await this.isEnable()).toBeTruthy()
    }

    async assertIsDisabled(): Promise<void> {
        expect(await this.isEnable()).toBeFalsy()
    }

    public async isVisible(): Promise<boolean> {
        try {
            await this.locator.page().waitForFunction(
                async (locator) => await locator.isVisible(),
                this.locator,
                { timeout: this.timeoutForVisibility * 1000, polling: 100 }
            )
            return true
        } catch (e) {
            return false
        }
    }

    public async isNotVisible(): Promise<boolean> {
        try {
            await this.locator.page().waitForFunction(
                async (locator) => !(await locator.isVisible()),
                this.locator,
                { timeout: this.timeoutForVisibility * 1000, polling: 100 }
            )
            return true
        } catch (e) {
            return false
        }
    }

    public async assertIsVisible(): Promise<void> {
        expect(await this.isVisible()).toBeTruthy()
    }

    public async assertIsNotVisible(): Promise<void> {
        expect(await this.isNotVisible()).toBeTruthy()
    }

    public async assertText(expectedText: string): Promise<void> {
        let actualText = await this.getActualText(this.locator)
        if (actualText === null) {
            await this.wait(1000)
            actualText = await this.getActualText(this.locator)
        }
        expect(actualText).toBe(expectedText)
    }

    private async getActualText(locator: Locator): Promise<string | null> {
        let actualText: string | null;
        if (this instanceof Button) {
            actualText = await (this as Button).getLabel()
        } else if (this instanceof TextBox) {
            actualText = await (this as TextBox).getText()
        } else {
            const textContent = await locator.textContent()
            actualText = textContent ? textContent.trim() : null
        }
        return actualText
    }

    async click() {
        if (this.clickDelay > 0) {
            await this.locator.page().waitForTimeout(this.clickDelay)
        }
        await this.locator.click()
    }

    public async wait(timeToWait: number): Promise<void> {
        await this.locator.page().waitForTimeout(timeToWait)
    }
}