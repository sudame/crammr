import { expect, test } from "@playwright/test";

test("home shows countdown at the top", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("countdown-days")).toBeVisible();
});
