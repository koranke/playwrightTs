import { Locator } from "@playwright/test";
import { ListControl } from "../../core/controls/listControl";
import { RepeatingControl } from "../../core/controls/repeatingControl";
import { Label } from "../../core/controls/label";
import { Button } from "../../core/controls/button";
import { LocatorMethod } from "../../core/enums/locatorMethod";
import { Product } from "../domain/product";

export class ListProducts extends ListControl<ListProducts> {
    private labelPriceControl: RepeatingControl<Label>
    private labelNameControl: RepeatingControl<Label>
    private labelDescriptionControl: RepeatingControl<Label>
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

        this.labelDescriptionControl = new RepeatingControl<Label>(
            locator, 
            "//div[@class='inventory_item_desc']", 
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

    labelPrice(): Label {
        return this.labelPriceControl.get(this.currentRow)
    }

    labelName(): Label {
        return this.labelNameControl.get(this.currentRow)
    }

    labelDescription(): Label {
        return this.labelDescriptionControl.get(this.currentRow)
    }

    buttonAddToCart(): Button {
        return this.buttonAddToCartControl.get(this.currentRow)
    }

    buttonRemoveFromCart(): Button {
        return this.buttonRemoveFromCartControl.get(this.currentRow)
    }

    async getCurrentProduct(): Promise<Product> {
        const name = await this.labelName().getText()
        const price = await this.labelPrice().getText()
        const description = await this.labelDescription().getText()
        return new Product(name, description, parseFloat(price))
    }
}