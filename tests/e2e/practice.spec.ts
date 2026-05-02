import { expect, test } from "@playwright/test";

test("add problem then practice with random pick", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("plan-name-input").fill("簿記");
  await page.getByTestId("plan-exam-date-input").fill("2026-05-16");
  await page.getByTestId("plan-save-button").click();

  // 問題追加
  await page.getByTestId("problem-statement-input").fill("1+1=?");
  await page.getByTestId("problem-answer-input").fill("2");
  await page.getByTestId("problem-explanation-input").fill("足し算");
  await page.getByTestId("problem-add-button").click();

  // 演習
  await page.getByTestId("practice-start-button").click();
  await expect(page.getByTestId("practice-statement")).toHaveText("1+1=?");
  await page.getByTestId("practice-answer-input").fill("2");
  await page.getByTestId("practice-submit-button").click();
  await expect(page.getByTestId("practice-result")).toHaveText("正解");
  await expect(page.getByTestId("practice-explanation")).toHaveText("足し算");
});
