import { expect, test } from "@playwright/test";

test("creating a plan switches the countdown to the entered exam date", async ({
  page,
}) => {
  await page.goto("/");

  // 未入力時はデフォルト試験日(2026-05-16)を見ている
  const initialDays = await page
    .getByTestId("countdown-days")
    .textContent();

  await page.getByTestId("plan-name-input").fill("TOEIC");
  // 遠めの未来日を指定して、デフォルトとの差分が出るようにする
  await page.getByTestId("plan-exam-date-input").fill("2027-12-31");
  await page.getByTestId("plan-save-button").click();

  await expect(page.getByTestId("plan-name")).toHaveText("TOEIC");

  const newDays = await page.getByTestId("countdown-days").textContent();
  expect(Number(newDays)).toBeGreaterThan(Number(initialDays));
});
