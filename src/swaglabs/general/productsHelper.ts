import { Product } from '../domain/product';
import { expect } from '@playwright/test';

export class ProductsHelper {
    public static verifyProductsSortOrder(products: Product[], sortingField: string, sortingDirection: SortingDirection): void {
        switch (sortingField) {
            case "Name":
                const productNames = products.map(product => product.name);
                if (sortingDirection === SortingDirection.DESCENDING) {
                    expect(productNames).toEqual([...productNames].sort().reverse());
                } else {
                    expect(productNames).toEqual([...productNames].sort());
                }
                break;
            case "Price":
                const productPrices = products.map(product => product.price);
                if (sortingDirection === SortingDirection.DESCENDING) {
                    expect(productPrices).toEqual([...productPrices].sort((a, b) => b - a));
                } else {
                    expect(productPrices).toEqual([...productPrices].sort((a, b) => a - b));
                }
                break;
            default:
                throw new Error(`Unknown sorting field: ${sortingField}`);
        }
    }
}

export enum SortingDirection {
    ASCENDING,
    DESCENDING
}