import { SortingDirection } from '../../src/core/enums/sortingDirection'
import { test } from '../../src/swaglabs/fixtures/siteFixture'
import { ProductsHelper } from '../../src/swaglabs/general/productsHelper'


test.describe('Products Page', () => {
    test('should be able to open page', async({site}) => {
        const productsPage = await site.productsPage().open()
        await productsPage.assertIsOpen()
    })

    test('should be able to view products', async({site}) => {
        const productsPage = await site.productsPage().open()
        const products = await productsPage.getAllProducts()
        ProductsHelper.verifyProductsSortOrder(products, "Name", SortingDirection.ASCENDING)
    })

    const sortScenarios = [
        {name: "Name", direction: SortingDirection.ASCENDING},
        {name: "Name", direction: SortingDirection.DESCENDING},
        {name: "Price", direction: SortingDirection.ASCENDING},
        {name: "Price", direction: SortingDirection.DESCENDING},
    ]

    sortScenarios.forEach(({name, direction}) => {
        test(`should be able to sort products by ${name} ${direction}`, async({site}) => {
            const productsPage = await site.productsPage().open()
            await productsPage.setSortingOption(name, direction)
            const products = await productsPage.getAllProducts()
            ProductsHelper.verifyProductsSortOrder(products, name, direction)
        })
    })
})

test.describe('Products Page - Cart', () => {
    test('should be able to add product to cart', async({site}) => {
        const productsPage = await site.productsPage().open()
        await productsPage.listProducts.withRow(1).buttonAddToCart().click()
        await productsPage.labelCartCount.assertText('1')
    })

    test('should be able to add multiple products to cart', async({site}) => {
        const productsPage = await site.productsPage().open()
        await productsPage.listProducts.withRow(1).buttonAddToCart().click()
        await productsPage.listProducts.withRow(2).buttonAddToCart().click()
        await productsPage.labelCartCount.assertText('2')
    })

    test('should be able to remove product from cart', async({site}) => {
        const productsPage = await site.productsPage().open()
        await productsPage.listProducts.withRow(1).buttonAddToCart().click()
        await productsPage.listProducts.withRow(1).buttonRemoveFromCart().click()
        await productsPage.labelCartCount.assertIsNotVisible()
    })
})
