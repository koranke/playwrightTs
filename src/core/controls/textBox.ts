import { Locator } from "@playwright/test"
import { BaseControl } from "../../internal"
import { TextControl } from "./textControl"

export class TextBox extends BaseControl implements TextControl {

    constructor(locator: Locator) {
        super(locator)
    }

    async setText(text: string) {
        await this.locator.fill(text)
    }

    async getText() {
        return await this.locator.inputValue()
    }

    async clear() {
        await this.locator.clear()
    }

}