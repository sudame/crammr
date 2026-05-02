import { expect, test } from "@playwright/test";

test("multiple plans can be created and switched", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("plan-name-input").fill("簿記");
  await page.getByTestId("plan-exam-date-input").fill("2026-05-16");
  await page.getByTestId("plan-save-button").click();
  await expect(page.getByTestId("plan-name")).toHaveText("簿記");

  // 1 件目作成後、プラン管理は折りたたまれるので開き直す
  const planManagement = page.getByTestId("plan-management");
  if (!(await planManagement.evaluate((el) => (el as HTMLDetailsElement).open))) {
    await planManagement.locator("summary").click();
  }

  await page.getByTestId("plan-name-input").fill("TOEIC");
  await page.getByTestId("plan-exam-date-input").fill("2027-12-31");
  await page.getByTestId("plan-save-button").click();
  await expect(page.getByTestId("plan-name")).toHaveText("TOEIC");

  const toeicDays = await page.getByTestId("countdown-days").textContent();

  // 2 件存在することを確認
  const options = await page
    .getByTestId("plan-switcher")
    .locator("option")
    .allTextContents();
  expect(options).toHaveLength(2);

  // 簿記 に切替
  await page
    .getByTestId("plan-switcher")
    .selectOption({ label: "簿記" });
  await expect(page.getByTestId("plan-name")).toHaveText("簿記");
  const bokiDays = await page.getByTestId("countdown-days").textContent();
  expect(Number(bokiDays)).toBeLessThan(Number(toeicDays));

  // リロードしても active が維持される
  await page.reload();
  await expect(page.getByTestId("plan-name")).toHaveText("簿記");
});
