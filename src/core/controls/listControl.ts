import { Locator } from "@playwright/test";
import { BaseControl } from "./baseControl";
import { Label } from "./label";
import { RepeatingControl } from "./repeatingControl";

export class ListControl<T> extends BaseControl {
    currentRow: number
    rowLocatorPattern: string
    hasHeader: boolean
    headerUsesRowLocatorPattern: boolean
    headerControlId: string
    searchLabel: RepeatingControl<Label>

    constructor(locator: Locator) {
        super(locator)
    }

    private getAdjustedRow(row: number): number {
        return this.hasHeader && this.headerUsesRowLocatorPattern ? row + 1 : row
    }

    getRowCount(): number {
        let rowCount: number = this.locator.locator(this.rowLocatorPattern).all.length
        return this.hasHeader && this.headerUsesRowLocatorPattern ? rowCount - 1 : rowCount
    }

    withRow(row: number): T {
        this.currentRow = row
        return this as unknown as T
    }

    async withRowText(text: string): Promise<T> {
        const index = await this.searchLabel.getIndex(text)
        if (index !== null) {
            this.currentRow = index
        }
        return this as unknown as T
    }
}