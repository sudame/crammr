import { expect, test } from "@playwright/test";

test("plan persists across page reload", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("plan-name-input").fill("永続化テスト");
  await page.getByTestId("plan-exam-date-input").fill("2027-12-31");
  await page.getByTestId("plan-save-button").click();
  await expect(page.getByTestId("plan-name")).toHaveText("永続化テスト");

  await page.reload();

  await expect(page.getByTestId("plan-name")).toHaveText("永続化テスト");
});
