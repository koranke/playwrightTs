import { Locator, Page } from 'playwright'
import { RepeatingControl } from '../../core/controls/repeatingControl'
import { Button, Label, ListControl } from '../../internal'
import { LocatorMethod } from '../../core/enums/locatorMethod'

export class ListCartItems extends ListControl<ListCartItems> {
    private _labelQuantity: RepeatingControl<Label>
    private _labelName: RepeatingControl<Label>
    private _labelPrice: RepeatingControl<Label>
    private _labelDescription: RepeatingControl<Label>
    private _buttonRemove: RepeatingControl<Button>

    constructor(locator: Locator) {
        super(locator)
        this.hasHeader = false
        this.headerUsesRowLocatorPattern = false
        this.rowLocatorPattern = "//div[@class='cart_item']"

        this._labelQuantity = new RepeatingControl(
            locator,
            "//div[@class='cart_quantity']",
            LocatorMethod.XPath,
            this.rowLocatorPattern,
            false,
            (locator: Locator) => new Label(locator)
        );
        this._labelName = new RepeatingControl(
            locator,
            "//div[@class='inventory_item_name']",
            LocatorMethod.XPath,
            this.rowLocatorPattern,
            false,
            (locator: Locator) => new Label(locator)
        );
        this._labelPrice = new RepeatingControl(
            locator,
            "//div[@class='inventory_item_price']",
            LocatorMethod.XPath,
            this.rowLocatorPattern,
            false,
            (locator: Locator) => new Label(locator)
        );
        this._labelDescription = new RepeatingControl(
            locator,
            "//div[@class='inventory_item_desc']",
            LocatorMethod.XPath,
            this.rowLocatorPattern,
            false,
            (locator: Locator) => new Label(locator)
        );
        this._buttonRemove = new RepeatingControl(
            locator,
            "Remove",
            LocatorMethod.Text,
            this.rowLocatorPattern,
            false,
            (locator: Locator) => new Button(locator)
        );
    }

    usingLabelName(): ListCartItems {
        this.searchLabel = this._labelName
        return this;
    }

    get labelQuantity(): Label {
        return this._labelQuantity.get(this.currentRow)
    }

    get labelName(): Label {
        return this._labelName.get(this.currentRow)
    }

    get labelPrice(): Label {
        return this._labelPrice.get(this.currentRow)
    }

    get labelDescription(): Label {
        return this._labelDescription.get(this.currentRow)
    }

    get buttonRemove(): Button {
        return this._buttonRemove.get(this.currentRow)
    }
}