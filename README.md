# みんなのみらい まるみえ政治資金

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Biome](https://img.shields.io/badge/Biome-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev/)

> 政治資金の流れを、見える形で公開するダッシュボード

政治団体「みんなのみらい」が会計データを公開し、市民が政治資金の流れを理解しやすくするための Web アプリケーションです。
会計データを可視化し、政治資金報告書の作成も支援します。

- 公開サイト: https://marumie.minnanomirai.org
- みんなのみらい: https://minnanomirai.org

運用者であるみんなのみらいとおのうえエンジニアチームが共同開発しました。

> 現在、公開サイトに表示している数値は、動作確認のためのデモ用のダミーデータです。

## 出典（元のプロジェクトについて）

本リポジトリは、チームみらいが AGPL v3 で公開しているオープンソース
「みらいまる見え政治資金」（[team-mirai/marumie](https://github.com/team-mirai/marumie)）を改変し、独自に開発しました。
元となるオープンソースを開発・公開されたすべての開発者の皆さまに敬意を表します。

みんなのみらいとチームみらいは異なる団体であり、本リポジトリと本サービスは、チームみらいとは関係のない、独立したものです。

## 本リポジトリでの主な変更

### 名称・デザイン

- 名称を「みんなのみらい まるみえ政治資金」に変更し、配色・書体・ロゴ・ファビコンを作り変えた
  - 配色: 白・黒・赤のアクセント。収入は青、支出は赤
  - 書体: 日本語は Zen Kaku Gothic New、英数字は Poppins
- ヘッダーのロゴ「みんなのみらい」は団体のサイト（minnanomirai.org）へ、「まるみえ政治資金」は本サイトのトップへリンクするよう分けた
- 団体ページに、みんなのみらいの紹介カード（「みんなのみらいとは」）を加えた

### 元のプロジェクト（チームみらい）向けの要素の削除

- 元のプロジェクトの紹介・活動報告・SNS リンク・寄附や党員募集・FAQ へのリンクと、ロゴ素材を削除し、出典の表記に置き換えた
- 議員ごとの調査研究費の公開ページ（`/p/…`）と、団体ページの「調査研究費」の欄を削除した（みんなのみらいには国会議員がいないため）
- 管理画面や設定の見本に残っていた旧名「まる見え」や、元のプロジェクトのスラッグ・ドメインの表記を改めた
- 元のプロジェクトのデザイン資料（ロゴ・画面のデザイン案など）を削除し、開発用の見本データを架空のデータに置き換えた

### 規約・ポリシー

- プライバシーポリシーを、みんなのみらいのプライバシーポリシー（minnanomirai.org と同じ内容）に差し替えた
- 利用規約で運営者をみんなのみらいと明記し、合意管轄裁判所を長崎地方裁判所にした

### 機能・運用

- 公開サイトの対象年度を 2026 年度のみにした（見本データと E2E テストも 2026 年度に合わせた）
- 政治団体が 1 件も登録されていないとき、トップページが再読み込みを繰り返す不具合を直し、「準備中です」と表示するようにした
- CSV の取り込みで、取引日が読めない行をプレビューで「無効」と表示し、取り込まないようにした
- 元のプロジェクトの GitHub Actions による本番デプロイ（`deploy-production`）を削除し、Vercel の Git 連携でデプロイする構成にした
- 管理画面（admin）の Vercel 設定から、定期実行（Cron）とキューの設定を外した（調査研究費の書類の処理に使うもので、本サービスでは使わないため）
- `WEBAPP_URL` が未設定のときの既定値を、元プロジェクトのドメインから `http://localhost:3000` に変更した
- CI で、ローカルの Supabase のポートが他の通信と重ならないよう予約するなど、GitHub Actions を本リポジトリで動くように調整した

## プロジェクト構成

```
marumie/
├── webapp/           # 公開サイト（一般の閲覧者向け）
├── admin/            # 管理画面（データ登録・管理、報告書XML生成）
├── shared/           # 共通モデル・型定義・ユーティリティ
├── data/             # サンプルデータ
├── supabase/         # Supabase ローカル開発環境の設定
├── prisma/           # データベーススキーマ・マイグレーション
└── docs/             # ドキュメント（正本とスナップショットの分類は docs/README.md を参照）
```

- **webapp**: 政治資金データの公開・可視化（収支の流れ、月ごとの推移、貸借対照表、出入金の一覧）
- **admin**: CSV の取り込み、残高・取引先・寄附者の管理、ユーザー管理、政治資金報告書 XML の出力
  - 元のプロジェクトにあった調査研究費（議員）の管理機能は管理画面に残っていますが、公開サイトには表示しません

`docs/` の多くは、元のプロジェクトで作られた設計メモです。記述と実装が食い違う場合は、実装が正しいものとして扱ってください。

## 技術スタック

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Prisma ORM, Supabase
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts, ApexCharts, Nivo
- **Database**: PostgreSQL（Supabase）
- **Development**: pnpm, Biome
- **Testing**: Jest, Playwright

## ローカル開発

セットアップ手順は [開発環境セットアップガイド](docs/getting-started.md) を参照してください。
Docker（ローカルの Supabase 用）が必要です。Windows では WSL2 を使います。

webapp だけを動かす場合は、PostgreSQL に接続できれば足ります（`DATABASE_URL` と `DIRECT_URL` を設定し、
`pnpm exec prisma migrate deploy` でテーブルを作ります）。管理画面（admin）は、Supabase の認証が必要です。

## 自分の環境で動かす場合

本リポジトリをもとに自分の環境で動かす場合は、[開発環境セットアップガイド](docs/getting-started.md) と、
各アプリの環境変数の見本（`webapp/.env.example`、`admin/.env.example`）を参照してください。
公開する場合は、後述の「ブランド素材の利用範囲」に従って、名称・ロゴ等を差し替えてください。

## ライセンス

このプロジェクトは [GNU Affero General Public License v3.0](LICENSE) の下でライセンスされています。

- **ソースコード**は AGPL v3 です。改変したものを Web サービスとして公開する場合は、
  利用者にソースコードを提供する義務があります（AGPL v3 第13条）。
- 元の著作権表示とライセンス文は、削除しないでください。
- 改変版も AGPL v3 で提供してください。

## ブランド素材（ロゴ・ファビコンなど）の利用範囲

「みんなのみらい」の名称・ロゴ・ファビコン・OG 画像は、**AGPL v3 の対象外**です。
これらの権利は、運営者であるみんなのみらいに帰属します。

| 素材 | ファイル |
|---|---|
| ロゴ（ヘッダー） | `webapp/public/logos/minna-no-mirai-logo.png` |
| ファビコン・アイコン | `webapp/src/app/favicon.ico`、`webapp/src/app/icon.png`、`webapp/src/app/apple-icon.png` |
| 共有用の画像（OG 画像） | `webapp/public/social/og_image.png` |
| サービス名 | `webapp/src/client/lib/site-config.ts` の `SITE_NAME` |

**利用してよい範囲**

- このリポジトリを clone・fork して、**手元で動かし、確認・学習・開発をする**ために、上の素材がそのまま入っていることは問題ありません。

**利用してはいけない範囲**

- fork した版の**公開サイト、配布物、他のサービスで、これらの素材と名称を使うこと**。
  自分たちの名称・ロゴ・ファビコンに**差し替えて**ください（差し替え場所は、上の表のとおりです）。
- これらの素材の、無断での転載・改変・商用利用。

素材の利用をご希望の場合は、事前に minnanomirai.nagasaki@gmail.com までご連絡ください。

なお、元プロジェクト（チームみらい）の名称・ロゴは、本リポジトリには含まれていません。
元プロジェクトの名称やロゴを使う場合は、チームみらいの定めに従ってください。

## コントリビューション

[CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

## セキュリティ

脆弱性の報告は [SECURITY.md](SECURITY.md) の手順に従ってください。

## 連絡先

みんなのみらい: minnanomirai.nagasaki@gmail.com
