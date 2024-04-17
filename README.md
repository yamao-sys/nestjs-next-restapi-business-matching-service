# nestjs-next-restapi-business-matching-service

## 参考
・styled-componentsにおいて、DOMに存在しないattributeをスタイル調整でpropsで使う
https://styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings

## frontend側の新規開発の設計
- 専属コンポーネントをコロケーションパターンで作成 & Jest, testing-libraryで結合テストで最低限の動作を確保
	- why
		- 新規開発時の速さと品質のちょうど良い塩梅
			- 新規開発の段階で細かく共通コンポーネントに分けると、共通部分の変更が入りやすく、テスト箇所も多くなる
				- 新規開発の段階ではまだ全体的なUIの決定がこれからのため
		- 全くテストがないというのはできるだけ避けたい
			- 結合テストを書いて動作を確保しておけば、後でリファクタリングもしやすい
			- テストを書くという文化を早期に醸成
			- E2Eを書いても良いが、結合テストと合わせてどっちもは難しい...
				- ハッピーパス(典型的なユースケースに沿ったシナリオ)の確認を0→1が終わった段階で書き始めるのが良いか

## frontend側のテスト方針
https://rightcode.co.jp/blogs/40957
https://note.com/cyberz_cto/n/n3ba47e0dcfd2
https://zenn.dev/maple_siro/articles/c0988e361b73c7
https://meetup-jp.toast.com/1771
https://zenn.dev/ignorant_kenji/articles/6f740feabf6f30
https://kaminashi-developer.hatenablog.jp/entry/2023/12/12/080000
https://techblog.finatext.com/front-end-testing-strategy-with-roi-82b22eb12811
https://zenn.dev/aldagram_tech/articles/kanna-integration-test
https://blog.cybozu.io/entry/2023/12/13/123701
https://gitkado.hatenadiary.jp/entry/20230517/1684250542

- E2Eに関して
	- Page RouterかつCSRではMSWでモックできた。
	- App RouterではMSW側からモックが難しい → testmodeが登場したが、2024年4月時点ではexperimental かつ 参考文献がまだ少ない...
	- 実行時間・メンテナンスコスト・信頼性の軸で結合テストとのバランスを考えることが大事
		- 結合テストをできるだけ厚くするのがコスパ良い
		- E2Eは結合テストでは補足が難しい部分、ハッピーパス(基本的なシナリオに沿った動作)を実装する

### 新規開発の場合
- 最低限コンポーネントが正しく動作すること
- コンポーネント同士の協調動作が正しく動作すること
- テスト作成・メンテナンスのコストと信頼度のバランス取りを考えると、単体テスト < 結合テスト・E2Eとしたい
- 結合テストはmock？ or 実際の挙動？
	- mock派
	  - mockを行うことでフロントエンドのテストになる
			- ただし、一連の動作を全てmockで検証しようとすると、実際のモジュール間の連結に対する検証ができず
			- → 個々のモジュール単位の小さな単体テスト < 複数のモジュールを組み合わせた形態を一つとみなし、より大きな規模の単体テストを行った方が良い
	- 実際の挙動派
- カバレッジ出してくれる実行方法
```
npx jest --coverage
```

- Jestの統合テスト vs Cypress
	- Jestの利点
		- frontend側のコードのミスに気づきやすい
	- Cypressの利点
		- 実際のブラウザ環境で行うため、より実際の動きを検証できる
			- JestはJSdomという仮想ブラウザ環境でテストを行うため、ルーティングがmock化せざるを得ない
		- デバッグのしやすさ
			- 実際のブラウザ環境なのでDOMの状態を検証したい場合にJestよりもやりやすい
		- Seleniumなど他のテストドライバよりも速い

| テスト種別 | テストコード作成対象 | 理由 | 何をテストするか |
| ---- | ---- | ---- | ---- |
| 単体 | 共通コンポーネント | ・変更が入った時の影響範囲が大きいため | ・propsが正しく受け取れているか<br>・イベントハンドラが動作するか |
| 結合 | 共通コンポーネント(molecules以上) | ・変更が入った時の影響範囲が大きいため | ・propsが正しく受け取れているか<br>・意図通りの子コンポーネントとの協調動作をするか(実際のユースケースに基づいたpropsなどで) |
| 結合 | 専属コンポーネント(molecules以上) | ・仕様通りに動作することを確認する<br>・リグレッションテストとしても機能する<br>・リファクタリングする時の安心材料となる | ・propsが正しく受け取れているか<br>・意図通りの子コンポーネントとの協調動作をするか(実際のユースケースに基づいたpropsなどで) |


## 0→1終了 or リプレイスの場合
- 新規開発の観点にプラス、E2EでAPI込みでページが動作すること
| テスト種別 | テストコード作成対象 | 理由 | 何をテストするか |
| ---- | ---- | ---- | ---- |
| E2E | 各ページ | ・仕様通りに動作することを確認する<br>・リグレッションテストとしても機能する<br>・リファクタリングする時の安心材料となる | ・最低限壊れずに動作するか<br>・ユースケースに基づいた入力で正しく動作するか |

・frontend側のテストの設定
https://nextjs.org/docs/pages/building-your-application/testing/jest
https://qiita.com/masakiwakabayashi/items/204ed2b32254bbc9a5c1#jestconfigjs%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B
https://zenn.dev/arsaga/articles/056e7196b41c08

・frontend側のテスト参考サイト
https://fwywd.com/tech/next-testing-mock
https://zenn.dev/tkdn/books/react-testing-patterns/viewer/context-and-testing
https://ucwork.hatenablog.com/entry/2019/01/02/211136
https://qiita.com/s_karuta/items/ee211251d944e72b2517#jestspyon%E3%82%92%E3%81%A4%E3%81%8B%E3%81%86-1
https://qiita.com/Leech/items/5cd1e83253d0179b0cec
https://stackoverflow.com/questions/67872622/jest-spyon-not-working-on-index-file-cannot-redefine-property
https://qiita.com/m-yo-biz/items/e9b6298d111ff6d03a5e

## コマンド類
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

エラーハンドリング
これ試す
https://qiita.com/H-goto16/items/49cc54d53bcd9102316d
