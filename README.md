# nestjs-next-restapi-business-matching-service

## 技術構成
### バックエンド
- NestJS 10.3.2
- MySQL 8.0.28
- Typeorm 0.3.20
- class-validator
- cookie-parser
- Jest

### フロントエンド
- React 18
- Next.js 14.1.4
- swagger-merger
- openapi2aspida
- styled-components
- Jest
- testing-library
- Playwright

## 技術選定背景
- REST API
	- 新規開発をスピーディに始められる(扱えるエンジニアが多い)
	- エンドポイントが増えてきたり、仕様が複雑になりデータ取得・整形ロジックが複雑になってきたらGraphQLも要検討
		- REST APIのままElasticsearchにデータを格納してそのまま返すのもありかも

- OpenAPI, Swagger
	- REST APIの型をバックエンドとフロントエンドで合わせたい
	- スキーマ定義のYMLファイルから型を自動生成できるよう、openapi2aspidaを導入
	
- swagger-merger
	- スキーマを一つのYMLファイルに定義すると、サービスの拡大に伴いスキーマファイルの可読性を損ねてくるため、YMLファイルを分割できるように導入

- 型安全にし、堅牢なアプリケーションを構築するためバックエンド・フロントエンドともにTypeScript
	- Rails一色などで作っても良さそうだが、開発速度と今後拡大しても耐えられるバランスを考え、TypeScriptを選択
	- 少人数でも開発できるよう、バックエンド・フロントエンドをフルスタックに開発する体制を想定
	- 型の定義をバックエンド・フロントエンドで揃えやすい(openapi2aspida)

### フロントエンド
- React(Nest.js)
	- 現在の主流で情報量が多く、ライブラリも豊富でエコシステムのサポートも厚いため
	- が、Nest.js 14ではまだライブラリで未対応のものがあるため(例 emotion)、やりたいことに対して不都合が生じずにできるかができるかは開発時に要注意

- CSS in JS(styled-components)
	- コンポーネント内でレイアウトを管理することにより、CSSのグローバルスコープ化を防ぐ
	- theme.tsを使うことにより、レイアウトのアプリケーションの共通値を管理できる
	- Emotionと比べて構築が簡単？(ここは要検証)

- Testing Library
	- Componentの単体テスト・結合テストで利用

- Playwright
	- E2Eテストで利用
	- ドキュメントの豊富さ、サービス拡大に伴い並列実行のクレジットがかかるCypressと比べ、無料で並列実行ができる

### バックエンド
- NestJS
	- Expressベースで簡単にAPIが構築できる
	- 素のExpressと比べてレイヤードアーキテクチャを組みやすい(コマンド一発)

- TypeORM
	- DB操作に限らず、SQLチューニングのためのEagerLoadやアソシエーション先の連動更新・連動削除とORMでやりたいことが一通りできる
	- Entityクラスからmigrationを自動生成できる
	- ただし、(TypeORMに限らずだが)テスト関連のロジックは自作する必要がある
		- データ作成ロジック(RailsでいうFactoryBot)
		- テストごとのDBのリセット処理
		- ボイラープレートとしておくと素早く始められる

- Cookieベースの認証
	- 安全性
	- フロントエンドとの繋ぎこみがしやすい(フロントエンドで特に意識せずCookieをつけてリクエストできる)

## 他に検討した技術選定
- Prisma
	- DSLによるスキーマ管理ができる
	- TypeORMと遜色なさそうだけど、市場調査でTypeORMの方が使われていたため見送り
	- が、個人開発で試してみたい

- GraphQL
	- エンドポイントが単一になり、スキーマ管理もしやすい、エンティティ間の関係をそれほど意識せずに書けるのが魅力
	- が、初期開発では少しオーバースペックに感じる。
		- Refetchやキャッシュ周りが新規開発時はオーバー
		- 開発初期はREST APIの方が速く開発できる。ボイラープレートがあればそこまで気にならず？
	- エンドポイントが増えてきたり、エンティティ間の関係が複雑になってきてレスポンスデータの加工が大変になってきたら検討

- OpenAPI generator
	- TypeScriptに限らずSwaggerが使えるのが魅力(技術構成によらずに使えるのが魅力)
		- 他の個人開発で使ってみたい
	- が、専用のJavaの環境を用意する必要があったり、TypeScriptオンリーで開発するため、aspidaでいく

- CSS Modules
	- CSS in JSと同様、CSSのグローバルスコープ化を防ぐ有力候補
	- Next.js 14でもサポートしている
	- 共通スタイルを作るのが難しい？(styled-componentsではthemeが使える)
		- 個人開発でやってみたい

## 仕様
- ログイン機能付きのビジネスマッチングサービス

## 機能
- 認証
	- 会員登録
	- ログイン

- プロフィール登録・更新

- 希望条件登録・更新

## 設計方針
### バックエンド
- シンプルなレイヤードアーキテクチャ
	- ドメイン単位にController -> Service(Domain Service) -> Repository
	- 初速が早く始められる、シンプルでわかりやすいため他のメンバーも開発しやすい
	- ビジネスロジックをService(Domain Service)に書く
	- ビジネスロジックが複雑になってきたら(複数のエンティティをCRUDする必要が出てきたら、RubyでいうPOROに切り出したり)、GraphQLを検討

- 認証チェックはGuardで行う
	- 認証していなければ401を返す

- DTOはSwaggerをもとに作成

- ファイルアップロードを伴うWebAPIの設計パターン
	- multipart/form-dataが主流だが、formを使用せず状態管理で行ったため、application/jsonで扱いたい...
		- 実装のしやすさから状態管理で行ったが、最初からformで管理した方が楽そうであればこの限りではない
	- 今回はファイルアップロード箇所が限定的 & ファイルサイズも〜数百KBなのでBase64でJSONで扱う
  - 参考: https://techblog.imagemagic.jp/2023/06/12/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89%E3%82%92%E4%BC%B4%E3%81%86webapi%E3%81%AE%E8%A8%AD%E8%A8%88%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E3%82%92/

### フロントエンド
- コンポーネント設計
	- Atomicデザインベース
	- 共通コンポーネント・専属コンポーネントに分ける
	- 専属コンポーネント
		- コロケーションパターンでページのエントリファイルと同階層に配置
			- ドメインロジック(カスタムフックなど)も同様にページのエントリファイルと同階層に配置
		- Container/Presentationalパターン
			- Pagesでデータ取得、Organismsで状態管理やロジックを持たせ、propsで下位コンポーネントに渡す
			- スタイルはBaseLayoutとmoluculesとatomsに任せる

- ライブラリ
	- まだそれほどの規模ではないためほとんどないが...(styled-components, remedaくらい)
	- 選定する時には以下を意識したい
		- メンテナンスが行われているか(1年以内に更新があるか)
		- 情報が豊富か
		- 後方互換性があるか(破壊的変更が起こりにくいか)

## テスト方針
バックエンド・フロントエンドともに
- 開発速度と安定性のバランスを取る
- サービスが大きくなってきた時のため、最低限のリグレッションテストを組む
	- 意図しないデグレ防止
	- リファクタリングしやすくなる
- テストを書く文化を早期に醸成したい

### バックエンド
- Serviceクラスの単体テストとリクエストテスト(NestJSでいうE2E)
	- ロジックの改修の動作を担保するためServiceクラスの単体テストを実施
	- エンドポイントが仕様通りに最低限動作するか(基本的な正常系・異常系)をリクエストテストで捕捉
	
### フロントエンド
- 専属コンポーネントの結合テスト
	- 最も改修が入る箇所のため
	- 協調動作が仕様を満たしているか、(意図しないデグレが起きていないか)を検知できるように
- E2Eテスト
	- 優先度は専属コンポーネントの結合テストの方が上
	- リクエストが仕様通りに動作するかは主にバックエンドのテストで捕捉
	- サービスが拡大してきたら、事故が起きるとダメージが大きなページにメインシナリオのテストを入れていきたい

## コマンド類
開発環境の立ち上げ
```
docker-compose build
docker-compose up
```

NestJSでresource(controller, service, module, entity)を一式作成する
```
nest g resource [name]
```

マイグレーション作成
```
npx ts-node ./node_modules/.bin/typeorm migration:generate -d ./data-source.ts ./migrations/
```

マイグレーション実行
```
npx ts-node ./node_modules/.bin/typeorm migration:run -d ./data-source.ts
```

バックエンドコンテナ内でCLIのバッチを実行する
```
npx ts-node src/commands/cli.ts <commandName> <args>
```

単体テスト実行(Backend)
```
# コンテナに入る
docker-compose exec web sh

npm run test
```

リクエストテスト(Backend)
```
# コンテナに入る
docker-compose exec web sh

npm run test:e2e
```

コンポーネントの単体・結合テスト実行(Frontend)
```
# コンテナに入る
docker-compose exec frontend sh

npm run test
```

E2E(Frontend)
```
# コンテナに入る
docker-compose exec frontend sh

npm run e2e
```

localstack

アクセスキーやリージョンなどの設定
```
aws configure --profile localstack

AWS Access Key ID [None]: dummy
AWS Secret Access Key [None]: dummy
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

バケット作成
```
aws s3 mb s3://<bucket_name> --endpoint-url=http://localhost:4567 --profile localstack
```

バケットの一覧表示
```
aws s3 ls --endpoint-url=http://localhost:4567 --profile localstack
```

## 参考(frontend側のテスト方針)
https://note.com/cyberz_cto/n/n3ba47e0dcfd2
https://meetup-jp.toast.com/1771
https://zenn.dev/ignorant_kenji/articles/6f740feabf6f30
https://blog.cybozu.io/entry/2023/12/13/123701
