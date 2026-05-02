# Sprint 3 Plan

- 開始: 2026-05-02 16:38
- 終了: 2026-05-02 17:00(本スプリントは 22 分。通常 20 分から +2 分)
- Sprint Goal: ユーザーが自分の試験プランを作成・永続化でき、PR preview 上で PO がその挙動をレビューできる

## 選定 PBI(計 16 SP・Sprint 2 比 2 倍ストレッチ)

- #20 feat: PR ごとのプレビュー環境(8 SP)
- #4 feat: プラン作成フォーム(メモリ内)(3 SP)
- #5 feat: IndexedDB 永続化(5 SP)

## 進め方

- 順序: #20 → #4 → #5(preview 基盤を先に通し、続く PR で実利用)
- **PR 分割**: #20 と #4 と #5 はそれぞれ別 PR。#20 はさらに「gh-pages 移行」「pr-preview workflow 追加」で分割可能性
- **sub-issue**: #20 と #5 は分解余地が大きいので着手前に GitHub sub-issue で分解(Sprint 2 Retro Try)
- 試験日まで残 14 日 → 1 sprint 約 16 SP 達成できればバックログ全完走の射程

## リスク

- #20 は本番 URL 一時不通リスク有(GH Pages Source 切替時)。テスト PR で確認するまで本番影響を意識
- 16 SP は Sprint 2 比 2 倍。Goal 未達の場合は **#20 を完走、#4 が次点、#5 は犠牲枠**の優先順位で判断
