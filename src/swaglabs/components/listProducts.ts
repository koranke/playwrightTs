import { Locator } from "@playwright/test";
import { ListControl } from "../../core/controls/listControl";
import { RepeatingControl } from "../../core/controls/repeatingControl";
import { Label } from "../../core/controls/label";
import { Button } from "../../core/controls/button";
import { LocatorMethod } from "../../core/enums/locatorMethod";

export class ListProducts extends ListControl<ListProducts> {
    private labelPriceControl: RepeatingControl<Label>
    private labelNameControl: RepeatingControl<Label>
    private buttonAddToCartControl: RepeatingControl<Button>
    private buttonRemoveFromCartControl: RepeatingControl<Button>
    

    constructor(locator: Locator) {
        super(locator)
        this.rowLocatorPattern = "//div[@class='inventory_item']"
        this.hasHeader = false
        this.headerUsesRowLocatorPattern = false

        this.labelPriceControl = new RepeatingControl<Label>(
            locator, 
            "//div[@class='inventory_item_price']", 
            LocatorMethod.XPath, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Label(locator))

        this.labelNameControl = new RepeatingControl<Label>(
            locator, 
            "//div[@class='inventory_item_name']", 
            LocatorMethod.XPath, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Label(locator))

        this.buttonAddToCartControl = new RepeatingControl<Button>(
            locator, 
            "Add to cart", 
            LocatorMethod.Text, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Button(locator))

        this.buttonRemoveFromCartControl = new RepeatingControl<Button>(
            locator, 
            "Remove", 
            LocatorMethod.Text, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Button(locator))
    }

    usingLabelName(): ListProducts {
        this.searchLabel = this.labelNameControl
        return this
    }

    async labelPrice(): Promise<Label | null> {
        return await this.labelPriceControl.get(this.currentRow)
    }

    async labelName(): Promise<Label | null> {
        return await this.labelNameControl.get(this.currentRow)
    }

    async buttonAddToCart(): Promise<Button | null> {
        return await this.buttonAddToCartControl.get(this.currentRow)
    }

    async buttonRemoveFromCart(): Promise<Button | null> {
        return await this.buttonRemoveFromCartControl.get(this.currentRow)
    }
}