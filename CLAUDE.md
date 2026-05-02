# CLAUDE.md

crammr は短期集中型・学習モチベーション維持アプリ(第一利用者の簿記試験 2026-05-16 受験に向けた開発)。

## このファイルの方針

- **薄く保つ**。詳細は外部に置き、ここからは参照する
- 外部に存在する情報を転記しない(参照リンクだけにする)
- 本ルール自体もここに書いておく(セッションごとに守る必要があるため)

## 必読リソース

セッション開始時に以下を確認すること:

- `docs/workflow/README.md` — 開発ワークフロー全般(スクラム運用、ツール、ディレクトリ構成、ひな形)
- `.handoff/要求定義書.md` / `.handoff/要件定義書.md` / `.handoff/handoff.md` — プロダクトの要求・要件・設計判断の経緯(gitignore 対象、ローカルのみ)
- GitHub Project #3 — バックログ・スプリント管理: https://github.com/users/sudame/projects/3
- Issues — https://github.com/sudame/crammr/issues
- メモリ: `~/.claude/projects/-Users-sudame-workspace-github-com-sudame-crammr/memory/MEMORY.md`(プロジェクト固有のユーザー設定/方針)

## 最低限の運用ルール

- スクラム運用(20 分スプリント + 10 分セレモニー、Daily Scrum 省略): `docs/workflow/README.md` を参照
- `.handoff/` ディレクトリは引継ぎ専用・gitignore 対象。コミットしない
- スプリントの記録(plan / retrospective)は `docs/workflow/sprints/<N>/` 配下に書く

## 注意

- `docs/workflow/README.md` 等の参照先が更新されたら、本ファイルは原則そのまま(参照だけ)で問題ない。本ファイル自身を肥大化させない
