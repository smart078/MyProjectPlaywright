import { Locator, Page, expect, test } from "@playwright/test";

test("Assertion Fill text box", async ({ page }) => {
    //page.setDefaultTimeout(10000);

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Text Box']").click();

    await page.locator("id=userEmail").fill("sm.wasap@example.com");
    await page.locator("id=submit").click();

    const textEmail = await page.locator("#email").innerText();
    console.log(textEmail);

    expect(textEmail).toEqual("Email:sm.wasap@example.com");

});

test("Assertion Validate number", async ({}) => {
    //page.setDefaultTimeout(10000);
    const num = 123.55;
    expect(num).toEqual(123.55);
    expect(num).toBeLessThanOrEqual(150);
    expect(num).toBeGreaterThanOrEqual(100);

    console.log(num);


});

test("Validate Date time", async ({ page }) => {

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Widgets']").click();
    await page.locator("xpath=//span[text()='Date Picker']").click();

    const currentDateText = await page.locator("#datePickerMonthYearInput").inputValue();
    const currentDate = new Date(currentDateText);
    const currentSec = currentDate.getTime();
    console.log(currentSec);

    const expectedDate = new Date("12/17/2023");
    const expectedSec = expectedDate.getTime();
    expect(currentSec).toEqual(expectedSec);
    console.log(expectedSec);

});
