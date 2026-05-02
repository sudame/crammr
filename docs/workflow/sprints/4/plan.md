# Sprint 4 Plan

- 開始: 2026-05-02 17:05
- 終了: 2026-05-02 17:25
- Sprint Goal: 学習者が複数プランを切替えつつ、当日ノルマを宣誓・記録し、ランダム演習で間隔反復学習が回せる(学習ループの中核完成)

## 選定 PBI(計 29 SP・Sprint 3 比 ~2 倍ストレッチ、Capacity 目標 ~30 SP)

- #6 feat: 複数プラン作成と切替(3 SP)
- #7 feat: 当日ノルマ宣誓と達成記録(5 SP)
- #8 feat: 問題プールへの問題追加 + ランダム1問演習(8 SP)
- #9 feat: Leitner 式間隔反復(13 SP)

## 進め方

- 順序: #6 → #7 → #8 → #9(プラン切替の土台 → ノルマ → 演習機能 → 出題優先度)
- **PR 分割**: 各 PBI を独立 PR(計 4 PR)
- **連続 PR rebase**: 親マージ後すぐ子を rebase + force-push(Sprint 3 Retro Try)
- **sub-issue**: #8 と #9 は分解必須(問題 CRUD と演習画面、ScheduleEntry スキーマと再出題ロジック等)
- **環境前提チェック**: 着手前に `gh api /repos/sudame/crammr` で permissions 確認(Sprint 3 Retro Try)
- **typecheck 範囲確認**: 新規 tsconfig や別エントリ追加時は CI/scripts も即更新(Sprint 3 Retro Try)

## バックログ並び順の取得方法(Sprint 3 で発見)

```
gh api graphql -f query='query { user(login: "sudame") { projectV2(number: 3) { items(first: 30) { nodes { content { ... on Issue { number title } } } } } } }'
```

→ board の手動並び順で返ってくる。Planning 時はこれで「上から取る」。

## リスク

- 29 SP は Sprint 3 比 1.8 倍。Capacity 目標 30 SP の上限近接。Goal 未達の場合は **#6→#7→#8 完走を最低ライン、#9 は犠牲枠**の優先順位
- #9 Leitner はアルゴリズム + スキーマ + 出題優先度の 3 要素。最も不確実性が高い

## 試験日まで

5/16 まで残 14 日。Sprint 4 完走で残バックログは 26 SP(#10〜#16 のうち未着手分)。1〜2 sprint で全完走射程。
