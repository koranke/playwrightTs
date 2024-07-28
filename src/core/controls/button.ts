import { BaseControl } from "./baseControl";
import { Locator } from "@playwright/test";

export class Button extends BaseControl {

    constructor(locator: Locator) {
        super(locator)
    }

    async getLabel(): Promise<string> {
        let label: string | null = await this.locator.getAttribute('value')
        if (label === null) {
            label = await this.locator.innerText()
        }
        return label
    }
}