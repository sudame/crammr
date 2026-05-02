# Sprint 2 Retrospective

- 開始: 2026-05-02 16:10
- 終了: 2026-05-02 16:30(Review/Retro/Planning は 16:25 頃から早めに開始)
- 達成度: **Sprint Goal 達成**(#2 と #3 を main マージ・本番デプロイまで完了)

## Sprint Goal

> 試験日カウントダウンが E2E で守られた状態で本番 URL に乗る

→ `https://sudame.net/crammr/` でカウントダウンが視認でき、Playwright E2E 2/2 green、本番 bundle hash がローカル build 結果と一致。

## 数値サマリ(Velocity 計測の初回)

- 計画 SP: 8(#2=5, #3=3)
- 達成 SP: 8(100%)
- Sprint 1 = 8 SP、Sprint 2 = 8 SP — 2 sprint 連続で 8 SP

## 完成物

main にマージ済:
- Sprint 2 plan(PR #21)
- Issue #2 + #3 実装(PR #22): Playwright + MCP + hooks 整備、試験日カウントダウン

## Keep(続けたいこと)

- **余り時間の活用**: Sprint Goal 早期達成後に Refinement(#20 採用案 C 決定 + Priority 格上げ)+ 全バックログ SP 見積もりまで実施。死に時間ゼロ
- **E2E が常設化された**: Playwright が入って以降「リファクタしても挙動が壊れていないか即確認できる」状態に。PO の安心感向上
- **PR 単位の段階公開**: plan.md だけ別 PR(#21)、実装は別 PR(#22)に分けたことでレビュー粒度が適切だった
- **Sprint 1 Retro Try の実践継続**: 「依存バージョンを原典で確認」「サブタスク先切り」「Goal にストレッチ感」はいずれも実行できた

## Problem(うまくいかなかったこと)

- **Claude の自己能力評価が低い(PO 指摘)**: Sprint 2 でもまだスコープが小さく、もっと実装できる余地があった。Sprint 1 = 8 SP / Sprint 2 = 8 SP は安全側に倒しすぎの可能性
- **見積もりがスプリント後追いになった**: Sprint 2 Planning の時点で SP が無く、「もっと積めるか」を Planning 中に判断できなかった

## Try(次スプリント以降で試す)

- **数値見積もりを Planning の判断材料にする**: Sprint 1=8、Sprint 2=8 の実績を基に Sprint 3 は思い切って **10〜13 SP** を Goal に乗せる(ストレッチ続投)
- **Velocity を毎スプリント記録**: retrospective.md の数値サマリ欄を継続。完了 SP / 計画 SP を残す
- **新規 PBI は作成時に SP 見積もりまで含める**: Refinement 段階で SP がついている状態を当たり前にする
- **PR をバックログアイテム内でも適切に分割**: 実装が本格化して 1 PBI が大きくなったら、レビューしやすい単位で PR を切る(例: 基盤層 → UI 層 → 仕上げ)。Sprint 3 以降の中〜大粒度 PBI(#5, #8, #9 等)で意識
- **GitHub sub-issue でサブタスクを公開**: Claude 内部の TaskCreate だけでなく、GitHub の sub-issue 機能で作業を分解する。**Product Backlog(Issue)= スプリント外、Sprint Backlog(sub-issue)= スプリント内** の関係。PO が作業進捗を Issue 上で追える(Issue 本文中の ToDo リストは閲覧されにくいので採用しない)

## Sprint Review で受領した PO 観点(追記)

- **Keep**: 余り時間で見積もり/リファインメントができた。E2E ができるようになったのは嬉しい
- **Problem**: Claude が自身の能力を過小評価している印象。もっと実装できたはず
- **要望**: 見積もりが数値化されたので次回以降の参考に。実装本格化時は PR 分割と sub-issue 活用で進捗を追えるようにしてほしい
