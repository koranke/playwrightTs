# Playwright Automation Framework in Typescript

This is a port of the Playwright Automation Framework from Java to Typescript.
For details on structure and usage, see the original project [here](https://github.com/koranke/UIFramework).

Here's a simple example of what a test might look like in this framework:

```typescript
    test('should be able to add multiple products to cart with accurate cart count', async({site}) => {
        const productsPage = await site.productsPage().open()
        await productsPage.listProducts.withRow(1).buttonAddToCart().click()
        await productsPage.listProducts.withRow(2).buttonAddToCart().click()
        await productsPage.labelCartCount.assertText('2')
    })
```