import { expect, test } from "@playwright/test";

test("countdown shows remaining days as a number", async ({ page }) => {
  await page.goto("/");
  const countdown = page.getByTestId("countdown");
  await expect(countdown).toBeVisible();
  const daysText = await page.getByTestId("countdown-days").textContent();
  expect(daysText).not.toBeNull();
  expect(Number.isFinite(Number(daysText))).toBe(true);
});
