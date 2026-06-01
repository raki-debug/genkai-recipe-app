# 限界レシピアプリ

今の体力（ライフ）に合わせた、**1STEPでできるレンジ料理**を提案するモバイルアプリのプロトタイプです。

## スクリーンショット

| ライフ選択 | レシピ表示 |
|---|---|
| ライフを10% / 30% / 50% から選ぶ | 食材と組み合わせて1STEPレシピを生成 |

## 技術スタック

- [Expo](https://expo.dev/) (SDK 56) + TypeScript
- [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS for React Native)
- Jest + ts-jest (ユニットテスト)

## セットアップ

```bash
npm install
npm start        # Expo開発サーバー起動
npm test         # テスト実行
```

## プロジェクト構成

```
genkai-recipe-app/
├── App.tsx               # メイン画面
├── src/
│   ├── types.ts          # 型定義
│   ├── recipeEngine.ts   # レシピ生成ロジック
│   └── recipeEngine.test.ts
├── tailwind.config.js
└── babel.config.js
```

## 今後の予定

- [ ] AI APIを使ったダイナミックなレシピ生成
- [ ] 冷蔵庫の食材を写真で入力
- [ ] レシピ履歴の保存
