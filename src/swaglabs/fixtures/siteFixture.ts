
import { test as base } from '@playwright/test';
import { SauceDemoSite } from '../pages/SauceDemoSite'

type SiteFixture = {
    site: SauceDemoSite
}

export const test = base.extend<SiteFixture>({
    site: async ({ page }, use) => {
        const site = new SauceDemoSite(page)
        await use(site)
    }
})

export { expect } from '@playwright/test';