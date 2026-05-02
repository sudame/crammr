import { expect, test } from "@playwright/test";

test("外部問題の演習結果を記録すると一覧に出る", async ({ page }) => {
  await page.goto("/");

  // プランを作成
  await page.getByTestId("plan-name-input").fill("簿記");
  await page.getByTestId("plan-exam-date-input").fill("2026-05-16");
  await page.getByTestId("plan-save-button").click();
  await expect(page.getByTestId("plan-name")).toHaveText("簿記");

  // 1 件目: 正解
  await page.getByTestId("attempt-identifier-input").fill("TAC P.42 問3");
  await page.getByTestId("attempt-correct-yes").check();
  await page.getByTestId("attempt-category-input").fill("仕訳");
  await page.getByTestId("attempt-pattern-input").fill("借方");
  await page.getByTestId("attempt-duration-input").fill("90");
  await page.getByTestId("attempt-memo-input").fill("試算表で確認");
  await page.getByTestId("attempt-save-button").click();

  await expect(page.getByTestId("attempt-list-item").first()).toContainText(
    "TAC P.42 問3",
  );

  // 2 件目: 不正解 (識別子のみ必須)
  await page.getByTestId("attempt-identifier-input").fill("過去問 2024 第1問");
  await page.getByTestId("attempt-correct-no").check();
  await page.getByTestId("attempt-save-button").click();

  await expect(page.getByTestId("attempt-list-item")).toHaveCount(2);
  // 最新は先頭
  await expect(page.getByTestId("attempt-list-item").first()).toContainText(
    "過去問 2024 第1問",
  );
  await expect(page.getByTestId("attempt-list-item").first()).toContainText(
    "不正解",
  );

  // リロード後も保持
  await page.reload();
  await expect(page.getByTestId("attempt-list-item")).toHaveCount(2);
});

test("識別子が空欄なら保存されない", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("plan-name-input").fill("簿記");
  await page.getByTestId("plan-exam-date-input").fill("2026-05-16");
  await page.getByTestId("plan-save-button").click();
  await expect(page.getByTestId("plan-name")).toHaveText("簿記");

  // 何も入力せず保存ボタンを押しても、HTML5 required で submit はブロックされる
  await page.getByTestId("attempt-save-button").click();
  await expect(page.getByTestId("attempt-list-empty")).toBeVisible();
});
