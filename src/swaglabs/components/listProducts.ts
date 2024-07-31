import { Locator } from "@playwright/test"
import { ListControl } from "../../core/controls/listControl"
import { RepeatingControl } from "../../core/controls/repeatingControl"
import { Label } from "../../core/controls/label"
import { Button } from "../../core/controls/button"
import { LocatorMethod } from "../../core/enums/locatorMethod"
import { Product } from "../domain/product"
import { ProductsHelper } from "../general/productsHelper"

export class ListProducts extends ListControl<ListProducts> {
    private _labelPrice: RepeatingControl<Label>
    private _labelName: RepeatingControl<Label>
    private _labelDescription: RepeatingControl<Label>
    private _buttonAddToCart: RepeatingControl<Button>
    private _buttonRemoveFromCart: RepeatingControl<Button>
    

    constructor(locator: Locator) {
        super(locator)
        this.rowLocatorPattern = "//div[@class='inventory_item']"
        this.hasHeader = false
        this.headerUsesRowLocatorPattern = false

        this._labelPrice = new RepeatingControl<Label>(
            locator, 
            "//div[@class='inventory_item_price']", 
            LocatorMethod.XPath, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Label(locator))

        this._labelName = new RepeatingControl<Label>(
            locator, 
            "//div[@class='inventory_item_name ']", 
            LocatorMethod.XPath, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Label(locator))

        this._labelDescription = new RepeatingControl<Label>(
            locator, 
            "//div[@class='inventory_item_desc']", 
            LocatorMethod.XPath, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Label(locator))

        this._buttonAddToCart = new RepeatingControl<Button>(
            locator, 
            "Add to cart", 
            LocatorMethod.Text, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Button(locator))

        this._buttonRemoveFromCart = new RepeatingControl<Button>(
            locator, 
            "Remove", 
            LocatorMethod.Text, 
            this.rowLocatorPattern, 
            this.hasHeader, 
            (locator: Locator) => new Button(locator))
    }

    get usingLabelName(): ListProducts {
        this.searchLabel = this._labelName
        return this
    }

    get labelPrice(): Label {
        return this._labelPrice.get(this.currentRow)
    }

    get labelName(): Label {
        return this._labelName.get(this.currentRow)
    }

    get labelDescription(): Label {
        return this._labelDescription.get(this.currentRow)
    }

    get buttonAddToCart(): Button {
        return this._buttonAddToCart.get(this.currentRow)
    }

    get buttonRemoveFromCart(): Button {
        return this._buttonRemoveFromCart.get(this.currentRow)
    }

    async getCurrentProduct(): Promise<Product> {
        const name = await this.labelName.getText()
        const price = await this.labelPrice.getText()
        const priceNumber = ProductsHelper.convertPriceToNumber(price)
        const description = await this.labelDescription.getText()
        return new Product(name, description, priceNumber)
    }
}