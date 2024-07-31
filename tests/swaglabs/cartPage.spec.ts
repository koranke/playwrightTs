import { Product } from '../../src/swaglabs/domain/product'
import { test } from '../../src/swaglabs/fixtures/siteFixture'
import { ProductsHelper } from '../../src/swaglabs/general/productsHelper'

test.describe('Cart Page', () => {
    test('should be able to open page with no products', async({site}) => {
        await site.productsPage.open()
        await site.productsPage.buttonCart.click()
        await site.cartPage.assertIsOpen()
        site.cartPage.listCartItems.assertRowCount(0)
    })

    test('should be able to view cart with a product', async({site}) => {
        const productsPage = await site.productsPage.open()
        await productsPage.listProducts.withRow(1).buttonAddToCart.click()
        await productsPage.buttonCart.click()
        await site.cartPage.assertIsOpen()
        site.cartPage.listCartItems.assertRowCount(1)
    })

    test('should be able to view multiple products in cart', async({site}) => {
        await site.productsPage.open()
        const products: Product[] = await ProductsHelper.getProductDetails(site, ["Sauce Labs Onesie", "Sauce Labs Bike Light"])
        await site.productsPage.buttonCart.click()
        await site.cartPage.listCartItems.assertRowCount(products.length)
        await ProductsHelper.verifyProductsInCart(products, site.cartPage)
    })

})