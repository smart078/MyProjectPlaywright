import { test, expect } from "@playwright/test";

class BaseElements {
    protected page;
    protected elementlocator;

    constructor(page, elementlocator) {
        this.page = page;
        this.elementlocator = elementlocator;
    }
}

class NumberElement extends BaseElements {
    private _number;

    constructor(page, elementlocator) {
        super(page, elementlocator);
        this._number = this.page.locator(this.elementlocator);
    }

    public async GetTodoCount() {
        const text = await this._number.innerText();
        return Number(text);
    }
}

test("Assignment", async ({ page }) => {
    await page.goto("https://demo.playwright.dev/todomvc/#/");
    
    const header = await page.locator(".header");
    expect(header).toHaveText('todos');
    const textInput = await page.locator(".new-todo");
    expect(textInput).toBeVisible();

    const inputs = ["input1", "input2", "input3"];
    for (let index = 0; index < inputs.length; index++) {
        await page.locator(".new-todo").fill(inputs[index]);
        await page.keyboard.press('Enter');
    }

    const countBeforeComplete = "[data-testid='todo-count'] strong";
    const getValueBeforeComplete = new NumberElement(page, countBeforeComplete);
    const resultValuesBeforeComplete = await getValueBeforeComplete.GetTodoCount();
    console.log(`${resultValuesBeforeComplete} items left`);

    const dataList = await page.locator(".todo-list").innerText();
    const splitDataList = dataList.split('\n');
    const array = JSON.stringify(splitDataList);
    console.log(array);

    const checkActiveButton = await page.locator("//a[@href='#/active']");
    expect(checkActiveButton).toBeEnabled();
    
    await checkActiveButton.click();
    const currentPageActive = await page.url();
    console.log(currentPageActive);

    const isChecked = await page.locator("[for='toggle-all']").isChecked();
    await page.locator("[for='toggle-all']").check();
    const isCheckedAfter = await page.locator("[for='toggle-all']").isChecked();

    if (isChecked != isCheckedAfter) {
        const todoCountLocator = "[data-testid='todo-count'] strong";
        const getValue = new NumberElement(page, todoCountLocator);
        const resultValueAfterComplete = await getValue.GetTodoCount();
        console.log(`${resultValueAfterComplete} items left`)
        if (isCheckedAfter) {
            const clickCompleted = await page.locator("//a[@href='#/completed']");
            await clickCompleted.click();
            const currentPageCompleted = await page.url();
            console.log(currentPageCompleted);
        }
    } else {
        console.log("Checkbox is not checked.");
    }

    const checkAllButton = await page.locator("//a[contains(text(), 'All')]");
    expect(checkAllButton).toBeEnabled();
    await checkAllButton.click();
    const currentPageAll = page.url();
    console.log(currentPageAll);

    const todoItems = await page.locator("//li[@data-testid='todo-item']");
    const todoItemCount = await todoItems.count();
    console.log(todoItemCount);

    for (let i = 0; i < todoItemCount; i++) {
        const checkbox = await page.locator(`//li[@data-testid='todo-item'][${i+1}]//input[@aria-label='Toggle Todo']`);
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
        }
    }

    const todoItemsDelete = await page.locator("//li[@data-testid='todo-item']");
    const todoItemDeleteCount = await todoItemsDelete.count();
    console.log(todoItemDeleteCount);

    for (let ii = 0; ii < todoItemDeleteCount; ii++) {
        await page.locator(`//li[@data-testid='todo-item'][${1}]//label[@data-testid='todo-title']`).hover();
        await page.locator(`//li[@data-testid='todo-item'][${1}]//button[@aria-label='Delete']`).click();
    }

});