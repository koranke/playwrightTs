
import { BaseSauceDemoPage } from "./baseSauceDemoPage"
import { Button } from '../../core/controls/button'
import { Label } from '../../core/controls/label'
import { ListProducts } from '../components/listProducts'
import { SauceDemoSite } from './SauceDemoSite'
import { Product } from "../domain/product"
import { SortingDirection } from "../../core/enums/sortingDirection"
import { ComboBox } from "../../core/controls/comboBox"
import { SelectComboBox } from "../../core/controls/selectComboBox"


export class ProductsPage extends BaseSauceDemoPage<ProductsPage> {
    buttonCart: Button
    labelTitle: Label
    labelCartCount: Label
    comboBoxSort: ComboBox
    listProducts: ListProducts

    constructor(site: SauceDemoSite) {
        super("inventory.html", site)
        this.buttonCart = new Button(this.page.locator("//a[@class='shopping_cart_link']"))
        this.labelTitle = new Label(this.page.locator("//span[@class='title']"))
        this.labelCartCount = new Label(this.page.locator("//span[@class='shopping_cart_badge']"))
        this.comboBoxSort = new SelectComboBox(this.page.locator("//select[@class='product_sort_container']"))
        this.listProducts = new ListProducts(this.page.locator("//div[@class='inventory_list']"))
    }

    async getAllProducts(): Promise<Product[]> {
        const products: Product[] = []
        for (let i: number = 1; i <= await this.listProducts.getRowCount(); i++) {
            this.site.productsPage().listProducts.withRow(i)
            products.push(await this.listProducts.getCurrentProduct())
        }
        return products
    }

    public async setSortingOption(sortingField: string, sortingDirection: SortingDirection): Promise<void> {
        let sortingOption = sortingField;
        if (sortingDirection === SortingDirection.ASCENDING) {
            sortingOption += sortingField === "Name" ? " (A to Z)" : " (low to high)"
        } else {
            sortingOption += sortingField === "Name" ? " (Z to A)" : " (high to low)"
        }
        await this.comboBoxSort.setText(sortingOption)
    }

}