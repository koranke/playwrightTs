import { expect, Locator } from "@playwright/test";
import { BaseControl } from "./baseControl";
import { ComboBox } from "./comboBox";

export class SelectComboBox extends BaseControl implements ComboBox {

    constructor(locator: Locator) {
        super(locator);
    }

    async setValue(value: string) {
        await this.locator.selectOption({ value: value });
    }

    async setText(text: string) {
        await this.locator.selectOption({ label: text });
    }

    async setIndex(index: number) {
        await this.locator.selectOption({ index: index });
    }

    async getText() {
        return await this.locator.inputValue();
    }

    async getValue() {
        return await this.locator.inputValue();
    }

    async getOptions() {
        return await this.locator.innerText().then((options) => {
            return options.split('\n');
        });
    }

    async assertText(text: string) {
        const selectedText = await this.getText();
        expect(selectedText).toBe(text);
    }

}