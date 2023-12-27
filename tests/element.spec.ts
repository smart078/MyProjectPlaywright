import { test } from "@playwright/test";
import path from "path";

test("Go to DEmo QA site", async ({ page }) => {
    page.setDefaultTimeout(10000);

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Buttons']").click();
    await page.locator("xpath=//button[@id='doubleClickBtn']").dblclick();
    await page.locator("xpath=//button[@id='rightClickBtn']").click({button : "right"});
    await page.locator("xpath=//button[text()='Click Me']").click();
    // await page.reload();
    // await page.close();
});

test("Input Data then Submit", async ({ page }) => {
    
    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Text Box']").click();

    await page.locator("id=userName").fill("Smart Wasap");
    await page.locator("id=userEmail").fill("sm.wasap@example.com");
    await page.locator("id=currentAddress").fill("xxx/xx m.6 Theparak road Mueang Samutprakan");
    await page.locator("id=permanentAddress").fill("x/x m.1 RongMueang Bangkok");

    await page.locator("id=submit").click();
});

test("Check Boxs", async ({ page }) => {
    
    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Check Box']").click();

    await page.locator("span.rct-text > button.rct-collapse").click();
    await page.locator("//span[@class='rct-title' and text()='Downloads']/../../button").click();
    await page.locator("//label[@for='tree-node-downloads']/span[@class='rct-checkbox']").check();
});

test("Radio button", async ({ page }) => {
    
    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Radio Button']").click();

    const RadioYes = await page.locator("//label[@for='yesRadio']");
    await RadioYes.click();
    const promiseCheck = await RadioYes.isChecked();
    console.log(promiseCheck);
    
    //click x y 
});

test("Dropdown Selection", async ({ page }) => {

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Widgets']").click();
    await page.locator("xpath=//span[text()='Select Menu']").click();

    await page.locator("id=oldSelectMenu").selectOption("Blue");
    
    //select one
    await page.locator("id=selectOne").click();
    await page.locator("id=selectOne >> text='Mr.'").click();

    //select multi
    await page.locator("//b[text()='Multiselect drop down']/../../div").click();
    await page.locator("//b[text()='Multiselect drop down']/../../div >> text='Green'").click();
});

test("Key & Shortcuts", async ({ page }) => {

    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Widgets']").click();
    await page.locator("xpath=//span[text()='Select Menu']").click();

    await page.locator("//b[text()='Multiselect drop down']/../../div").click();
    await page.locator("//b[text()='Multiselect drop down']/../../div").press('G');
    await page.locator("//b[text()='Multiselect drop down']/../../div").press('r');
    await page.locator("//b[text()='Multiselect drop down']/../../div").press('e');
    await page.locator("//b[text()='Multiselect drop down']/../../div").press('e');
    await page.locator("//b[text()='Multiselect drop down']/../../div").press('n');
    await page.locator("//b[text()='Multiselect drop down']/../../div").press('Enter');
});

test("Upload file",async ({ page }) => {
   
    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Upload and Download']").click();

    await page.locator("id=uploadFile").setInputFiles(path.join(__dirname,"../assets/sample_640×426.jpeg"));
    
});

test("Download file",async ({ page }) => {
   
    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Elements']").click();
    await page.locator("xpath=//span[text()='Upload and Download']").click();

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    const file = downloadPromise;
    console.log(file); 
    
});

test("Drag and Drop",async ({ page }) => {
   
    await page.goto("https://demoqa.com");
    await page.locator("xpath=//h5[text()='Interactions']").click();
    await page.locator("xpath=//span[text()='Droppable']").click();

    await page.locator("#draggable").dragTo(page.locator("#droppable >> nth=0"));
    
});