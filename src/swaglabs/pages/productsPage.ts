
import { Page } from '@playwright/test'
import { BaseSauceDemoPage } from "./baseSauceDemoPage"
import { Button } from '../../core/controls/button'
import { Label } from '../../core/controls/label'
import { ListProducts } from '../components/listProducts'


export class ProductsPage extends BaseSauceDemoPage<ProductsPage> {
    buttonAddToCart: Button
    labelTitle: Label
    labelCartCount: Label
    listProducts: ListProducts


    constructor(page: Page) {
        super("inventory.html", page)
        this.buttonAddToCart = new Button(page.locator("//a[@class='shopping_cart_link']"))
        this.labelTitle = new Label(page.locator("//span[@class='title']"))
        this.labelCartCount = new Label(page.locator("//span[@class='shopping_cart_badge']"))
        this.listProducts = new ListProducts(page.locator("//div[@class='inventory_list']"))
    }

}