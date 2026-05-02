# Sprint 1 Plan

- 開始: 2026-05-02 15:38
- 終了予定: 2026-05-02 16:00(ただしセレモニー込みで余裕を見ると 16:00 まで実装、16:00-16:10 でセレモニー)
- Sprint Goal: 開発者(sudame)が、これ以降のスプリント成果を毎回 `https://sudame.github.io/crammr/` で実際に触って確認できる状態にする。なぜなら以降の全スプリントで「動くデプロイ済みの成果」を維持する開発スタイルを取るため、最初に確認手段を整える必要があるから。

## 選定 PBI

- #1 chore: GitHub Pages 自動デプロイ + Vite 最小雛形

## スコープ外(意図的に外したもの)

- #2(Playwright + MCP + hooks): 20 分に #1 と同居は厳しいため次スプリント以降。#2 の DoD のうち `CLAUDE.md` 作成は先行完了済み(Issue 着手時に DoD を再確認して更新する)
- `404.html` フォールバックは現時点で route が無いので Issue #1 の範囲外(将来 SPA ルーティング導入時に対応)

## 完了確認の方法

- `https://sudame.github.io/crammr/` をブラウザで開いて空ページが見える
- ローカルで `git commit` → `git push` → GitHub Actions が走り Pages が更新されることを目視確認
