import { Product } from '../domain/product'
import { expect } from '@playwright/test'
import { CartPage } from '../pages/cartPage'
import { Label } from '../../internal'
import { SortingDirection } from '../../core/enums/sortingDirection'
import { SauceDemoSite } from '../pages/sauceDemoSite'

export class ProductsHelper {

    public static verifyProductsSortOrder(products: Product[], sortingField: string, sortingDirection: SortingDirection): void {
        switch (sortingField) {
            case "Name":
                const productNames = products.map(product => product.name)
                if (sortingDirection === SortingDirection.DESCENDING) {
                    expect(productNames).toEqual([...productNames].sort().reverse())
                } else {
                    expect(productNames).toEqual([...productNames].sort())
                }
                break
            case "Price":
                const productPrices = products.map(product => product.price)
                if (sortingDirection === SortingDirection.DESCENDING) {
                    expect(productPrices).toEqual([...productPrices].sort((a, b) => b - a))
                } else {
                    expect(productPrices).toEqual([...productPrices].sort((a, b) => a - b))
                }
                break
            default:
                throw new Error(`Unknown sorting field: ${sortingField}`)
        }
    }

    public static async verifyProductsInCart(expectedProducts: Product[], cartPage: CartPage): Promise<void> {
        if (!expectedProducts || expectedProducts.length === 0) {
            await cartPage.listCartItems.assertRowCount(0)
        } else {
            for (const product of expectedProducts) {
                await cartPage.listCartItems.usingLabelName().withRowText(product.name)
                console.log("PRINTING DETAILS...")
                console.log(await cartPage.listCartItems.labelName.getText())
                console.log(await cartPage.listCartItems.labelDescription.getText())
                console.log(await cartPage.listCartItems.labelPrice.getText())

                await cartPage.listCartItems.labelDescription.assertText(product.description)
                let priceString = this.convertPriceToString(product.price)
                const lp: Label = cartPage.listCartItems.labelPrice
                await lp.assertText(priceString)
                await cartPage.listCartItems.labelQuantity.assertText("1")
            }
        }
    }

    public static convertPriceToNumber(price: string): number {
        return parseFloat(price.replace(/[^0-9.-]+/g, ""))
    }

    public static convertPriceToString(price: number): string {
        return `$${price.toFixed(2)}`
    }

    public static async getProductDetails(site: SauceDemoSite, productNames: string[]): Promise<Product[]> {
        const products: Product[] = []
    
        for (const productName of productNames) {
            await (await site.productsPage.listProducts.usingLabelName.withRowText(productName)).buttonAddToCart.click()
            const product = await site.productsPage.listProducts.getCurrentProduct()
            products.push(product)
        }

        return products
    }
}