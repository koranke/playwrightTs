import { Locator } from "@playwright/test";
import { BaseControl } from "./baseControl";
import { TextControl } from "./textControl";

export class Label extends BaseControl implements TextControl {

    constructor(locator: Locator) {
        super(locator)
    }

    async getText() {
        return await this.locator.textContent().then((text) => {
            return text?.trim() || ''
        })
    }
}