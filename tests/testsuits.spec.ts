import { expect, test } from "@playwright/test";
import { url } from "inspector";

const scenarios = [
    {
        url:"https://www.google.com"
    },
    {
        url:"https://www.youtube.com"
    }
]
for (const scenario of scenarios) {
    test(`Go to ${scenario.url}`, async ({ page }) => {
        await page.goto(scenario.url);

        expect(page.url()).toContain(scenario.url);
    });
}