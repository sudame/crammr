# crammr 開発ワークフロー

このドキュメントは crammr プロジェクトの仕事の進め方をまとめたもの。プロジェクトに参加するたび(セッション開始時)に最新を読み直すこと。

## 体制

- 開発者: 1 名(sudame) + Claude Code
- ロール: sudame は Product Owner / Stakeholder / 開発者を兼任、Claude Code は実装担当
- 並行学習: sudame は同時に簿記試験(2026-05-16)に向けた学習中。開発に時間を取られすぎないことが最優先

## 仕事の進め方

### アジャイル(垂直スライス)

- **常に動くコードを維持する**。土台だからといってインフラを先取りせず、各スプリント終了時にデプロイ済み URL で触れる状態を保つ
- **垂直スライス**で機能を切る。Redux/IndexedDB などの抽象化は必要になった時点で必要なぶんだけ導入し、育てる
- 小さく出して、レトロで方針修正する

### スクラム(20 分マイクロスプリント)

| 区分 | 時間 |
|---|---|
| Sprint(実装) | **20 分** |
| Sprint Review | 〜3 分 |
| Retrospective | 〜3 分 |
| Sprint Planning | 〜4 分 |
| **1 サイクル合計** | **30 分** |

- **Daily Scrum は省略**(20 分スプリントなので不要)
- スプリント開始/終了は会話上で明示宣言する(例「Sprint 1 開始 14:30」)
- Sprint Goal はスプリントごとに 1 つ、Sprint Planning で決める
- 1 スプリントに乗せる PBI は 1〜数個。多すぎたら Retro で見直す

### セレモニーの実施手順

スプリント終了直後の 10 分で、順に以下を実施:

1. **Sprint Review**
   - Sprint Goal が達成されたかを動作で確認(デプロイ済み URL / Playwright 実行結果 / スクショ)
   - 未達なら「何が残ったか」を短く言語化
2. **Retrospective**
   - うまくいったこと / 改善点を 2〜3 行で `docs/workflow/sprints/<N>/retrospective.md` に記録
3. **Sprint Planning**
   - 次の Sprint Goal を決定
   - 候補 PBI を Product Backlog から選び、GitHub Project の `Sprint` フィールドを次の Sprint 値に更新、Status を `Ready` に
   - 内容を `docs/workflow/sprints/<N+1>/plan.md` に記録

## ツール

| 用途 | 使うもの |
|---|---|
| バックログ管理 | GitHub Project #3 (https://github.com/users/sudame/projects/3) |
| Issue 管理 | https://github.com/sudame/crammr/issues |
| 自律 UI フィードバックループ | Playwright MCP(Issue #2 で導入) |
| E2E テスト | Playwright(Issue #2 で導入) |
| 開発ホスト | GitHub Pages (https://sudame.github.io/crammr/) |

### GitHub Project のフィールド

- **Status**: `Backlog` / `Ready` / `In Progress` / `In Review` / `Done`
- **Sprint**(single-select): `Sprint 1`, `Sprint 2`, ...(都度追加)
- **Priority**: `High` / `Mid` / `Low`
- **Estimate**(number): 20 分スプリントで何個入るかの感覚値

### ビュー

- **Product Backlog**: Sprint 未割当アイテムを Priority 降順で表示
- **Sprint Board**: 現スプリントのアイテムを Status で kanban 表示

## ディレクトリ構成(本ドキュメント関連)

```
docs/
  workflow/
    README.md            # このファイル
    sprints/
      1/
        plan.md          # Sprint 1 の Planning 結果(Sprint Goal、選定 PBI)
        retrospective.md # Sprint 1 の Retro 結果
      2/
        plan.md
        retrospective.md
      ...
```

各 `plan.md` / `retrospective.md` は短く、箇条書き中心で書く。冗長な説明は避ける。

### plan.md のひな形

```markdown
# Sprint <N> Plan

- 開始: YYYY-MM-DD HH:MM
- Sprint Goal: <一文>

## 選定 PBI
- #<issue番号> <タイトル>
```

### retrospective.md のひな形

```markdown
# Sprint <N> Retrospective

- 終了: YYYY-MM-DD HH:MM
- 達成度: <Sprint Goal 達成 / 部分達成 / 未達>

## Keep
- ...

## Problem
- ...

## Try(次スプリントで試す)
- ...
```

## 参照

引継ぎ専用ドキュメントは `.handoff/`(gitignore 対象、ローカルのみ)に置く:

- `.handoff/要求定義書.md` — プロダクト要求
- `.handoff/要件定義書.md` — プロダクト要件
- `.handoff/handoff.md` — 設計判断の経緯と却下案リスト
