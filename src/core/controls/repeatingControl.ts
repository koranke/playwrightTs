import { Locator } from "@playwright/test"
import { BaseControl } from "./baseControl"
import { LocatorMethod } from "../enums/locatorMethod"
import { TextControl } from "./textControl"

export class RepeatingControl<T> extends BaseControl {
    controlId: string
    controlId2: string
    controlId3: string
    locatorMethod: LocatorMethod
    rowLocatorPattern: string
    hasHeader: boolean
    getControl: (locator: Locator) => T
    getCustomControl: (locator: Locator, control: T) => T

    constructor(locator: Locator, 
        controlId: string, 
        locatorMethod: LocatorMethod, 
        rowLocatorPattern: string, 
        hasHeader: boolean, 
        getControl: (locator: Locator) => T, 
        ) {
        super(locator)
        this.controlId = controlId
        this.locatorMethod = locatorMethod
        this.rowLocatorPattern = rowLocatorPattern
        this.hasHeader = hasHeader
        this.getControl = getControl
    
    }

    async get(row: number): Promise<T | null> {
        if (this.getControl === undefined) {
            return await this.getCustom(row)
        }

        if (this.controlId === undefined) {
            return await this.getControl(this.getRowLocator(row))
        } else {
            switch (this.locatorMethod) {
                case LocatorMethod.XPath:
                    return await this.getControl(this.getRowLocator(row).locator(this.controlId))
                case LocatorMethod.Text:
                    return await this.getControl(this.getRowLocator(row).getByText(this.controlId))
                case LocatorMethod.Data_TestId:    
                    return await this.getControl(this.getRowLocator(row).getByTestId(this.controlId))
                default:
                    throw new Error(`Locator method ${this.locatorMethod} not implemented`)
            }
        }
    }

    async getCustom(row: number): Promise<T | null> {
        //need to implement
        return null
    }


    public async getIndex(targetText: string): Promise<number | null> {
        const startingIndex = this.hasHeader ? 2 : 1;
        const rowCount = await this.getRowCount();
        for (let i = startingIndex; i < rowCount; i++) {
            const textControl = await this.get(i) as TextControl;
            const text = await textControl.getText();
            if (text.includes(targetText)) {
                return i;
            }
        }
        return null;
    }

    private getAdjustedRow(row: number): number {
        return this.hasHeader ? row + 1 : row
    }

    private getRowLocator(row: number): Locator {
        row = this.getAdjustedRow(row)
        return this.locator.locator(this.rowLocatorPattern.replace("{0}", row.toString()))
    }

    private async getRowCount(): Promise<number> {
        return await this.locator.locator(this.rowLocatorPattern).all().then((elements) => elements.length)
    }

}