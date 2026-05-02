import { expect, test } from "@playwright/test";

test("daily quota declare and achieve flow", async ({ page }) => {
  await page.goto("/");

  // プラン作成(quota パネル表示の前提)
  await page.getByTestId("plan-name-input").fill("簿記");
  await page.getByTestId("plan-exam-date-input").fill("2026-05-16");
  await page.getByTestId("plan-save-button").click();

  // 宣誓
  await page.getByTestId("quota-declare-input").fill("10");
  await page.getByTestId("quota-declare-button").click();
  await expect(page.getByTestId("quota-declared")).toHaveText("10");

  // 達成記録
  await page.getByTestId("quota-achieve-input").fill("7");
  await page.getByTestId("quota-achieve-button").click();
  await expect(page.getByTestId("quota-achieved")).toHaveText("7");

  // リロードしても残る
  await page.reload();
  await expect(page.getByTestId("quota-declared")).toHaveText("10");
  await expect(page.getByTestId("quota-achieved")).toHaveText("7");
});
