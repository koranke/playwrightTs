import { Page } from "@playwright/test"

export class Site<T> {
    page: Page
    baseUrl: string
    isSignedIn: boolean = false

    constructor(page: Page, baseUrl: string) {
        this.page = page
        this.baseUrl = baseUrl
    }

}