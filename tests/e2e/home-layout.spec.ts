import { expect, test } from "@playwright/test";

test("初回起動: プラン管理が展開され、empty-state が表示される", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByTestId("countdown-days")).toBeVisible();
  await expect(page.getByTestId("empty-state")).toBeVisible();

  const planManagement = page.getByTestId("plan-management");
  await expect(planManagement).toBeVisible();
  const isOpen = await planManagement.evaluate(
    (el) => (el as HTMLDetailsElement).open,
  );
  expect(isOpen).toBe(true);

  // ノルマ・演習はプラン未作成のため非表示
  await expect(page.getByTestId("daily-quota")).toHaveCount(0);
  await expect(page.getByTestId("practice")).toHaveCount(0);
});

test("プランあり: プラン管理が折りたたまれ、ノルマ・演習が最上位コンテンツになる", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByTestId("plan-name-input").fill("簿記");
  await page.getByTestId("plan-exam-date-input").fill("2026-05-16");
  await page.getByTestId("plan-save-button").click();

  await expect(page.getByTestId("plan-name")).toHaveText("簿記");
  await expect(page.getByTestId("daily-quota")).toBeVisible();
  await expect(page.getByTestId("practice")).toBeVisible();

  // リロードで折りたたみ状態を確認(プランがあるので閉じている)
  await page.reload();
  const planManagement = page.getByTestId("plan-management");
  const isOpen = await planManagement.evaluate(
    (el) => (el as HTMLDetailsElement).open,
  );
  expect(isOpen).toBe(false);
});

test("プラン管理は手動で開閉できる", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("plan-name-input").fill("簿記");
  await page.getByTestId("plan-exam-date-input").fill("2026-05-16");
  await page.getByTestId("plan-save-button").click();
  await expect(page.getByTestId("plan-name")).toHaveText("簿記");
  await page.reload();
  await expect(page.getByTestId("plan-name")).toHaveText("簿記");

  const planManagement = page.getByTestId("plan-management");
  await expect(planManagement).not.toHaveAttribute("open", /.*/);
  await planManagement.locator("summary").click();
  await expect(planManagement).toHaveAttribute("open", /.*/);
});
