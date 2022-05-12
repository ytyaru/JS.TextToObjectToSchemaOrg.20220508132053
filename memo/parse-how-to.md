# HowTo

　Txty.composite形式。Stores＋Tree。

```
HowTo-Store (Require)

HowToSupply-Store (Option)

HowToTool-Store (Option)

HowToSteps-Tree (Require)
```

```
name
totalTime      `P[n]Y[n]M[n]DT[n]H[n]M[n]S` `PT3H4M5S`
estimatedCost
image
video

name    image
name    image

name    image
name    image

準備（section.name）
    あれを用意する（Step.text）    image
        あれをあれする。（Direction.text）
手順
    手順1    image
    手順2    image
        手順2-1
        手順2-2
後始末
    ゴミを捨てる    image
        ゴミを分別する
```

* ImageObject
* VideoObject
* MonetaryAmount

### HowTo-Store (Require)

```
name
totalTime      `P[n]Y[n]M[n]DT[n]H[n]M[n]S` `PT3H4M5S`
estimatedCost
image
video
```

* `name`は必須
* ほかは任意
    * どの順序で何が来るかをどう判断するか
        * データ形式で判断する
            * URL：image, video
            * ISODuration: totalTime
            * MonetaryAmount: estimatedCost

```
"estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "100"
},
```

　通貨の表現には以下のような記号もある。だが使用しない。数値より前か後か、大文字か小文字か、などムダに複雑化してしまう。そこで通貨コードISO4217（３文字）を使用する。数値の後に書く。もしなければ日本円（JPY）とする。

currency-text
```
$＄         USD
€          EUR
¥￥円       JPY
,.
```

### image

```
URL    
```
```
URL    widthxheight
URL    license
```
```
URL    license    acquireLicensePage
URL    widthxheight    license
URL    license    widthxheight
```
```
URL    widthxheight    license    acquireLicensePage
URL    license    acquireLicensePage    widthxheight
```

　本来は上記のようなパターンがある。が、後続にvideoがありうる。複雑化をさけるため、どちらもURLのみとする。

### video（HowTo）

　HowToにおけるVideo設定箇所は以下の２つ。

```
HowTo-Store (Require)

HowToSteps-Tree (Require)
```

#### HowTo-Store (Require)

```
video.contentUrl    video.embedUrl（拡張子.mp4などがついていたらcontentUrl。両方ともそうでなければ先頭のほうがcontentUrlとする）    duration
```

名前|説明
----|----
`video.contentUrl`|動画ファイルへのリンク
`video.embedUrl`|動画プレーヤのリンク
`duration`|再生時間（`PT00H30M5S`）

　URLが2つある。先頭がcontentUrl, 次がembedUrl。おそらく拡張子.mp4などがついていたらcontentUrl。両方ともそうでなければ先頭のほうがcontentUrlとする。ただし拡張子による判断はサーバの処理によって拡張子なしでも実現できる。よって順序による判定のほうが優先される。もしURL行が１列だけだった場合、どちらであるか判断するとき、拡張子を使うことにする。

　[VideoOject][]によると必須項目は以下。

[VideoOject]:https://developers.google.com/search/docs/advanced/structured-data/video?hl=ja#video-object

名前|型|説明
----|--|----
`name`|Text|タイトル
`description`|Text|説明文
`thumbnailUrl`|URL|サムネイル画像URL
`uploadDate`|Date|公開日時

　HowToの設定値を共有する。

名前|型|説明
----|--|----
`name`|Text|HowToのnameと同じにする
`description`|Text|HowToのnameと同じにする
`thumbnailUrl`|URL|HowToのimageURLと同じにする
`uploadDate`|Date|なければ現時刻とする

#### HowToSteps-Tree (Require)

```
準備（section.name）
    あれを用意する（Step.text）    image    video
        あれをあれする。（Direction.text）
手順
    手順1    image    video
    手順2    image    video
        手順2-1
        手順2-2
後始末
    ゴミを捨てる    image
        ゴミを分別する

```

　手順のところだけピックアップ。オプション情報は以下のようなパターンがありうる。

```
手順
    手順1
```

画像つき
```
手順
    手順1    https://image.png
```

動画の前には画像が必要
```
手順
    手順1    https://image.png    https://video.mp4
```

画像を詳しく
```
手順
    手順1    https://image.png    640x480
    手順1    https://image.png    https://license.html
    手順1    https://image.png    https://license.html    640x480   
    手順1    https://image.png    640x480    https://license.html
    手順1    https://image.png    https://license.html    https://acquireLicensePage.html
    手順1    https://image.png    640x480    https://license.html    https://acquireLicensePage.html
```

動画を詳しく（Clip）
```
手順
    手順1    https://image.png    https://video.mp4?start=10    10..25
```

画像と動画を詳しく
```
手順
    手順1    https://image.png    640x480    https://license.html    https://acquireLicensePage.html    https://video.mp4?start=10    10..25
```

　手順ツリー。`HowToStep`の箇所のみimageやvideoを持ちうる。


　HowTo全体だと`HowTo`と`HowToStep`の箇所のみimageやvideoを持ちうる。

型|Videoを持ちうるか
--|-----------------
`HowTo`|⭕
`HowToSection`|❌
`HowToStep`|⭕
`HowToDirect`|❌
`HowToTip`|❌
`HowToSupply`|❌
`HowToTool`|❌

