# nestjs-next-restapi-business-matching-service

## 参考
・styled-componentsにおいて、DOMに存在しないattributeをスタイル調整でpropsで使う
https://styled-components.com/docs/faqs#why-am-i-getting-html-attribute-warnings

## frontend側のテスト方針
https://rightcode.co.jp/blogs/40957
https://note.com/cyberz_cto/n/n3ba47e0dcfd2

### 新規開発の場合
- 最低限コンポーネントが正しく動作すること
- コンポーネント同士の協調動作が正しく動作すること

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
