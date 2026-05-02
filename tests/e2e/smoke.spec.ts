import { expect, test } from "@playwright/test";

test("home shows crammr heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("crammr");
});
