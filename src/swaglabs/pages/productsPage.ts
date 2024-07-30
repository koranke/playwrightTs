
import { BaseSauceDemoPage } from "./baseSauceDemoPage"
import { Button } from '../../core/controls/button'
import { Label } from '../../core/controls/label'
import { ListProducts } from '../components/listProducts'
import { SauceDemoSite } from './SauceDemoSite'
import { Product } from "../domain/product"
import { SortingDirection } from "../general/productsHelper"
import { ComboBox } from "../../core/controls/comboBox"
import { SelectComboBox } from "../../core/controls/selectComboBox"


export class ProductsPage extends BaseSauceDemoPage<ProductsPage> {
    buttonAddToCart: Button
    labelTitle: Label
    labelCartCount: Label
    comboBoxSort: ComboBox
    listProducts: ListProducts


    constructor(site: SauceDemoSite) {
        super("inventory.html", site)
        this.buttonAddToCart = new Button(this.page.locator("//a[@class='shopping_cart_link']"))
        this.labelTitle = new Label(this.page.locator("//span[@class='title']"))
        this.labelCartCount = new Label(this.page.locator("//span[@class='shopping_cart_badge']"))
        this.comboBoxSort = new SelectComboBox(this.page.locator("//select[@class='product_sort_container']"))
        this.listProducts = new ListProducts(this.page.locator("//div[@class='inventory_list']"))
    }

    async getAllProducts(): Promise<Product[]> {
        const products: Product[] = []
        for (let i: number = 0; i < this.listProducts.getRowCount(); i++) {
            this.site.productsPage().listProducts.withRow(i)
            products.push(await this.listProducts.getCurrentProduct())
        }
        return products
    }

    public async setSortingOption(sortingField: string, sortingDirection: SortingDirection): Promise<void> {
        let sortingOption = sortingField;
        if (sortingDirection === SortingDirection.ASCENDING) {
            sortingOption += sortingField === "Name" ? " (A to Z)" : " (low to high)";
        } else {
            sortingOption += sortingField === "Name" ? " (Z to A)" : " (high to low)";
        }
        await this.comboBoxSort.setText(sortingOption);
    }

}