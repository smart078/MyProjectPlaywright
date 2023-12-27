import { Locator, Page, test } from "@playwright/test";

test("Scrapping data", async ({ page }) => {
    //page.setDefaultTimeout(10000);

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Text Box']").click();

    await page.locator("id=userName").fill("Smart Wasap");
    await page.locator("id=userEmail").fill("sm.wasap@example.com");

    await page.locator("id=submit").click();

    const nameText = await page.locator("#name").innerText();
    console.log(nameText);

    const nameSplit = nameText.split(':');
    const nameRegExp = nameText.match(RegExp(/Name(.*)/));
    console.log(nameRegExp![1]);  
    
});

class BaseElement {

    protected readonly page: Page;
    protected readonly elementLocator: Locator;

    constructor(page: Page, elementLocator: Locator) {

        this.page = page;
        this.elementLocator = elementLocator;
    }
}

class EmployeeRowElement extends BaseElement {

    private _name: Locator = this.elementLocator.locator("//div[@class='rt-td'] >> nth=0");
    private _lastname: Locator = this.elementLocator.locator("//div[@class='rt-td'] >> nth=1");
    private _age: Locator = this.elementLocator.locator("//div[@class='rt-td'] >> nth=2");
    private _email: Locator = this.elementLocator.locator("//div[@class='rt-td'] >> nth=3");

public async getName() {

    const textName = await this._name.innerText();
    return textName;
}

}

test("Get data in table", async ({ page }) => {

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Web Tables']").click();

    const rowLocator = page.locator(`//div[@class='rt-tbody']//div[@role='row' and 
    @class!='rt-tr -padRow -even' and @class!='rt-tr -padRow -odd']`);
    const rowCount = await rowLocator.count();
    console.log(rowCount);

    for (let i = 0; i < rowCount; i++) {
        const locator = page.locator(`//div[@class='rt-tbody']//div[@role='row' and 
        @class!='rt-tr -padRow -even' and @class!='rt-tr -padRow -odd']`);
        
        const getNameSingle = new EmployeeRowElement(page, locator.nth(i));
        const nameSingle = await getNameSingle.getName();
        console.log(nameSingle);   
    }
});

test("Get Current Page url", async ({ page }) => {

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Web Tables']").click();

    const aaa = page.url();
    console.log(aaa);
});

