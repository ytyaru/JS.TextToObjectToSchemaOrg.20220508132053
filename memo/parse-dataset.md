# Dataset

## 必須プロパティ

名前|型|説明
----|--|----
description|Text|データセットの要約文。
name|Text|データセットのわかりやすい名前。

### 推奨プロパティ

名前|型|説明
----|--|----
alternateName|Text|エイリアスや略語など、データセットを示すために使用されている代替名。
creator|Person または Organization|このデータセットの作成者。
citation|Text または CreativeWork|データセットに加えて引用されている、データ プロバイダが推奨する学術記事を識別します。
funder|Person または Organization|このデータセットの資金提供を行う個人または組織。
hasPart または isPartOf|URL または Dataset|データセットが小さなデータセットのコレクションである場合、hasPart プロパティを使用してその関係を表します。逆に、データセットが大きなデータセットの一部である場合は、isPartOf を使用します。
identifier|URL、Text、または PropertyValue|DOI やコンパクト識別子などの識別子。
isAccessibleForFree|Boolean|支払いなしでデータセットにアクセスできるかどうかを指定します。
keywords|Text|データセットの概要を示すキーワード。
license|URL または CreativeWork|データセットの配布ライセンス。次に例を示します。
measurementTechnique|Text または URL|データセットで使用される手法、テクノロジー、または方法。
sameAs|URL|データセットの ID を明確に示す参照ウェブページの URL。
spatialCoverage|Text または Place|データセットの空間様相を記述する単一のポイントを指定できます。
temporalCoverage|Text|データセットのデータは、特定の期間を対象として含みます。
variableMeasured|Text または PropertyValue|データセットが測定する変数（温度や圧力など）。
version|Text または Number|データセットのバージョン番号。
url|URL|データセットを記述するページの場所。


item
```
データセット名    データセット説明    URL    URL    URL    ...
```

store
```
データセット名    URL    License    isFree    creator.name    creator.url
データセット説明
URL    書式
URL    書式
...
```

## DataDownload

### 必須プロパティ

名前|型|説明
----|--|----
distribution.contentUrl|URL|ダウンロードのリンク。

### 推奨プロパティ

名前|型|説明
----|--|----
distribution|DataDownload|データセットのダウンロードの場所と、ダウンロードのファイル形式の記述。
distribution.encodingFormat|Text または URL|配布のファイル形式。

```javascript
      "distribution":[
         {
            "@type":"DataDownload",
            "encodingFormat":"CSV",
            "contentUrl":"http://www.ncdc.noaa.gov/stormevents/ftp.jsp"
         },
         {
            "@type":"DataDownload",
            "encodingFormat":"XML",
            "contentUrl":"http://gis.ncdc.noaa.gov/all-records/catalog/search/resource/details.page?id=gov.noaa.ncdc:C00510"
         }
      ],
```

