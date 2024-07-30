import { Button, Label } from "../../internal"
import { ListCartItems } from "../components/listCartItems"
import { BaseSauceDemoPage } from "./baseSauceDemoPage"
import { SauceDemoSite } from "./SauceDemoSite"

export class CartPage extends BaseSauceDemoPage<CartPage> {
    labelTitle: Label
    buttonContinueShopping: Button
    listCartItems: ListCartItems

    constructor(site: SauceDemoSite) {
        super("cart.html", site)
        this.labelTitle = new Label(this.page.locator("//span[@class='title']"))
        this.listCartItems = new ListCartItems(this.page.locator("//div[@class='cart_list']"))
        this.buttonContinueShopping = new Button(this.page.locator("//button[@id='continue-shopping']"))
    }
}