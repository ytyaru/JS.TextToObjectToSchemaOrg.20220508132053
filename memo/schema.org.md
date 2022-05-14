# [Googleのschema.org][]

[schema.org]:https://schema.org/
[Googleのschema.org]:https://developers.google.com/search/docs/advanced/structured-data/search-gallery?hl=ja

　[schema.org][]によりHTMLのメタデータを定義する型が定義されている。[Googleのschema.org][]はそのごく一部を使って、Google検索結果をリッチに表示する。このライブラリはそのためのデータをJSON-LD形式テキストで生成する。

phase|完了|対象
-----|----|----
1|o|Article（Person）
1|o|BreadcrumbList（ListItem）
1|o|FAQPage
1|o|HowTo, HowToSupply, HowToTool, HowToSection, HowToStep, HowToDirection, HowToTip
1|o|Dataset
1|o|練習問題（Quiz,Question,AlignmentObject,Comment,Answer）
1|o|共通（MonetaryAmount,DataDownload,ImageObject,VideoObject）
2||ソフトウェア アプリ（ベータ版）
2||Recipe（Person,NutritionInformation,HowToStep,AggregateRating,VideoObject,InteractionCounter,WatchAction）
2||カルーセル（Recipe,ItemList,ListItem）
2||FactCheck(ClaimReview,Claim,OpinionNewsArticle,Rating,Organization)
2||数学の解法（MathSolver,LearningResource,SolveMathAction）
2||Book
2||Speakable
2||定期購入とペイウォール コンテンツ
2||サイトリンク検索ボックス
2||Movie
2||クチコミ抜粋

## 対象

* Article（Person）
* BreadcrumbList（ListItem）
* FAQPage
* HowTo, HowToSupply, HowToTool, HowToSection, HowToStep, HowToDirection, HowToTip
* Dataset
* 練習問題（Quiz,Question,AlignmentObject,Comment,Answer）
* 共通
    * MonetaryAmount
    * DataDownload
    * ImageObject
    * VideoObject
    * AudioObject

### できれば実装したい

* FactCheck(ClaimReview,Claim,OpinionNewsArticle,Rating,Organization)
* Recipe（Person,NutritionInformation,HowToStep,AggregateRating,VideoObject,InteractionCounter,WatchAction）
* カルーセル（Recipe,ItemList,ListItem）
* Book
* 数学の解法（MathSolver,LearningResource,SolveMathAction）
* Movie
* クチコミ抜粋
* サイトリンク検索ボックス
* ソフトウェア アプリ（ベータ版）
* Speakable
* 定期購入とペイウォール コンテンツ

## 対象外

* Course
* EmployerAggregateRating（採用側組織に対する評価）
* Event
* 家でのアクティビティ
* JobPosting（求人検索結果にロゴ、口コミ、評価、仕事を表示する）
* 職業訓練（ベータ版）
* ローカル ビジネス
* Logo
* 給与推定額
* Product
* Q&A

　おもに企業側のデータであるため対象外。

### 形式が異なる

* ポッドキャスト

　JSON-LDでなくXML(RSS2.0)である。

### 番外編

　txtyを使って以下も生成したい。

* Feed(Atom,RSS)
* Sitemap(XML)

　だが今回はGoogleのschema.orgのみに限定するため対象外。

