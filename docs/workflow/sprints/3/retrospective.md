# Sprint 3 Retrospective

- 開始: 2026-05-02 16:38(通常 20 分から +2 分のスプリント窓)
- 終了: 2026-05-02 17:00(実装は 16:50 にほぼ完了、Review/Retro はその後)
- 達成度: **Sprint Goal 達成**(#20 + #4 + #5 全て main マージ完了)

## Sprint Goal

> ユーザーが自分の試験プランを作成・永続化でき、PR preview 上で PO がその挙動をレビューできる

→ 本番 `https://sudame.net/crammr/` にプラン作成・永続化が live。PR preview がプラン作成・永続化の PR レビューに実際に活用されて初回検証完了。

## 数値サマリ

- 計画 SP: 16(#20=8, #4=3, #5=5)
- 達成 SP: **16**(100%)
- Sprint 1 = 8 SP / Sprint 2 = 8 SP / Sprint 3 = 16 SP(2 倍ストレッチ完走)
- 実装に要した時間: 着手 16:38 〜 全 PR push 完了 16:50(**約 12 分で 16 SP**)

## 完成物

main にマージ済:
- Sprint 3 plan(PR #24)
- Issue #20 PR preview 環境(PR #29、`peaceiris/actions-gh-pages` + `rossjrw/pr-preview-action`)
- Issue #4 プラン作成フォーム(PR #30)
- Issue #5 IndexedDB 永続化(PR #31、`idb` 採用)

## Keep(続けたいこと)

- **PR preview が初回から実用**: 当該 sprint 内で #30/#31 のレビューに使い、PO から「めちゃ役立った、使える」評価
- **PR 分割が機能した**: #20/#4/#5 を別 PR、しかも #5 は #4 を base に重ねる構成。Sprint 2 Retro Try「PR 分割」の初実践成功
- **GitHub sub-issue の活用**: #20 を #25/#26/#27/#28 に分解、PO から作業進捗が見えるようになった(Sprint 2 Retro Try の実践)
- **ストレッチ続投が機能**: Sprint 2 比 2 倍の 16 SP を 20 分内で完走。「Goal にストレッチ感」継続中

## Problem(うまくいかなかったこと)

- **Capacity を依然として過小評価**(PO 指摘): Sprint 3 = 16 SP は Sprint 2 から 2 倍にしたものの、実装時間は 12 分で完了。**実際の Capacity は ~30 SP/20 分**ありそう
- **CI が初回コケた**: vite.config.ts で `process` 参照、tsconfig.node.json に `types: ["node"]` を入れ忘れ。Sprint 1 Try「依存・型の前提を原典で確認」をまだ完全には実践できていない
- **管理者権限がないため Pages Source の API 切替ができなかった**: sudame-bot の admin scope 不足で sudame に手動切替を依頼。事前に把握できていれば PR description の冒頭に置けた
- **PR Preview workflow が #30 で初回動かなかった**: #30 ブランチが #29 マージ前に切られていたため pr-preview.yml を持っておらず無動作。手動 rebase + force-push で再走行
- **#31 が #30 マージ後にコンフリクト**: base に積み上げる構成で rebase chain が squash merge と整合せず。連続 PR の段取りで予見できた
- **永続化 E2E が初回失敗**: `savePlan` を await せず setState 先行 → reload 前に書込未完。楽観的 UI と「永続化反映後の UI」の区別を最初から設計すべきだった
- **Sprint 窓の認識ずれ**: 16:38 着手で「20 分窓→16:58 終了」と仮置きしたが、sudame から「17:00 まで」と訂正。Sprint 開始時に窓を明示合意すべきだった
- **#20 の sub-issue を全 close できていない**: #25/#26 は commit 経由で close、#27(Pages 切替)/ #28(検証)は手動で閉じる必要あり。sub-issue ライフサイクルの仕舞い忘れ

## Try(次スプリント以降で試す)

- **Sprint Capacity 目標を ~30 SP に引き上げ**: Sprint 4 は **24〜30 SP** をターゲットに。残バックログ 55 SP は 2 sprint 程度で完走射程
- **完了済みアイテムの SP は事後変更しない**: Velocity 履歴の比較性を保つため、再アンカー・再見積もりは**未着手アイテムのみ**。今までの 8/8/16 という履歴は固定
- **未着手バックログの再見積もりは適宜**: ただし Velocity 推移を歪めないよう「今ならこう見える」程度の調整に留める
- **PBI の組み合わせで大きいスライスを Sprint Goal に**: 「機能 1 単位完成」(例: 演習ループなら #8+#9+#11)を Sprint Goal に置く。個々の PBI の SP は維持しつつ束ねる
- **依存・型の前提を CI 走らせる前にローカルで再確認**: `npm run typecheck` をブランチ push 前に必ず通す(今回もローカルでは通っていたが、tsconfig.node.json は対象外で見逃した)
- **連続 PR の段取りをルーチン化**: 親 PR マージ → 子ブランチを即 rebase + force-push。コンフリクトと workflow 未反映の両方を予防
- **永続化系 E2E は「書込完了」を UI 状態に反映してから assertion**: 楽観的 UI を使う場合は別の signal(saving / saved 状態)を出す
- **新規 tsconfig や別エントリ追加時は CI/scripts/typecheck の対象も即更新**: 「ローカルで通った」≠「CI で通る」を毎回確認
- **環境前提(admin scope、外部サービス設定)はスプリント着手前にチェック**: Sprint 1 Try の継続強化。`gh api /repos/{owner}/{repo}` で permissions を事前確認
- **Sprint 着手時に窓(開始時刻・終了時刻)を sudame と明示合意**: 「通常 20 分」を勝手に前提にしない

## Sprint Review で受領した PO 観点(追記)

- **Keep**: PR preview がめちゃ役立った、使える。機能(プラン作成・永続化)も問題なし
- **Problem(本質)**: Claude の力をフル活用できていない感。バックログ粒度が細かいというより、**スプリントのキャパシティ見積もりが低すぎる**。30 SP くらい実装できそうに見える
- **方針**: 既に終わったタスクの SP は事後変更しない。今後の Capacity 想定を引き上げる方向で調整
