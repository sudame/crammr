# Sprint 2 Plan

- 開始: 2026-05-02 16:10
- Sprint Goal: 試験日カウントダウンが E2E で守られた状態で本番 URL に乗る

## 選定 PBI

- #2 chore: Playwright + Playwright MCP + Claude Code hooks 整備
- #3 feat: 試験日カウントダウン(ハードコード)

## 進め方

- 順序: #2 → #3(E2E 基盤を先に整え、#3 は最初から E2E でガードしながら実装)
- #2 はフル DoD で実施(Playwright 本体 + MCP 登録 + hooks + `CLAUDE.md` 追記)
- Sprint 1 Retro Try「Goal にストレッチ感」を反映。20 分内に完走を狙う

## リスク

- #2 自体が「20 分に収まらない可能性」と注記済。間に合わない場合は #3 を最優先で着地させ、#2 残タスクは Sprint 3 に持ち越す判断を Review で行う
