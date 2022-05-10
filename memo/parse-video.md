# Video

* [HowTo][]の`video`
* [Video][]

[HowTo]:https://developers.google.com/search/docs/advanced/structured-data/how-to?hl=ja
[Video]:https://developers.google.com/search/docs/advanced/structured-data/video?hl=ja


* [HowTo][]の`video`
    * 
* [Video][]
    * 生放送（LIVEバッジ）
    * 動画カルーセル
    * Clip
    * SeekToAction
* 必須
    * `description`
    * `name`
    * `thumbnailUrl`
    * `uploadDate`
* 推奨
    * `contentUrl`／`embedUrl`
    * `duration`
    * `expires`
    * `hasPart`（`Clip`）
        * `"@type": "Clip"`
        * `"@id": "Clip-1"`
        * `startOffset`
        * `endOffset`
        * `name`
        * `url`
    * `interactionStatistic`（視聴回数）
    * `publication`（LIVE）
    * `regionsAllowed`（動画が許可されている地域）

## HowTo

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

　videoがあると一気に複雑化してしまう。なのでimageまでとする。一応、videoを付与するとどんな感じになるのか考えてみる。

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

### video（HowTo）

* HowTo（`"@type": "VideoObject"`）
* HowToStep（`"@type": "Clip"`）

　以下のような値がほしい。

* HowTo（`"@type": "VideoObject"`）
    * 必須
        * `"@type": "VideoObject"`
        * `description`（HowToの`name`とする）
        * `name`（HowToまたはHowToStepのそれとする。または`text`）
        * `thumbnailUrl`（imageのそれとする。つまりvideoはimageが必須）
        * `uploadDate`（入力時は省略したい。APIで取得できたらいいが確実でない。よって出力日時とする）
    * 推奨
        * `contentUrl`／`embedUrl`
        * `duration`（再生時間`PT00H30M5S`）
        * `expires`（有効期限）
        * `hasPart`（`Clip`）
            * `"@type": "Clip"`
            * `"@id": "Clip-1"`
            * `startOffset`
            * `endOffset`
            * `name`
            * `url`
        * `interactionStatistic`（視聴回数）
        * `publication`（LIVE）
        * `regionsAllowed`（動画が許可されている地域）
* HowToStep（`"@type": "Clip"`）
    * `"@type": "Clip"`
    * `"@id": "Clip-1"`
    * `startOffset`
    * `endOffset`
    * `name`
    * `url`

　HowToでは動画である`"@type": "VideoObject"`の値をセットする。

　HowToStepでは動画の一部分である`"@type": "Clip"`の値をセットする。

　HowToのときはそれ自体と共有できるデータが多い。逆に動画専用である`uploadDate`は入力したくない。

　HowToStepのときはビデオがあるならほぼすべて入力することになる。

　HowToにおける動画はURLだけでいい。`duration`を付与することもできる。ほかのオプションについてはHowTo動画として不要。または視聴回数はAPIで取得すべきであり実現性が低いし重要性も低いため不採用とする。

```
name
totalTime      `P[n]Y[n]M[n]DT[n]H[n]M[n]S` `PT3H4M5S`
estimatedCost
image
video.contentUrl    video.embedUrl（拡張子.mp4などがついていたらcontentUrl。両方ともそうでなければ先頭のほうがcontentUrlとする）    duration

...
```

　ISO8601-duration用ライブラリは以下。

* [duration-iso-8601][]

[duration-iso-8601]:https://www.jsdelivr.com/package/npm/@tehshrike/duration-iso-8601

　ISO8601形式のときもあれば`hh:mm:ss`形式や`sssss`（秒）のときもある。これらを相互変換できるようにしたい。

```javascript
class Duration {
    #year = 0
    #month = 0
    #day = 0
    #hour = 0
    #minute = 0
    #second = 0
    constructor(value) {}
    fromDate(date) {}
    fromIso(iso) {}
    fromSecond(second) {}
    ToDate() {}
    ToIso() {}
    ToSecond() {}
    add(value) {} // 加算
    sub(value) {} // 減算
    static isIsoDuration(value) {} // PT00H00M00S, P00Y00M00DT00H00M00S
    static isIsoDatetime(value) {} // hh:mm:ss（２桁だとmm:ss／hh:mmの区別がつかないので）
    static isIsoDatetimeHms(value) {} // hh:mm:ss
    static isIsoDatetimeHm(value) {}  // hh:mm
    static isIsoDatetimeMs(value) {}  // mm:ss
    static isSecond(value) { return parseInt(value) || parseFloat(value) || false; }
    static isDate(value) { return Date.parse(value); }
}
```

　作り込もうとすると大変。

### Video

```
name
description
uploadDate
thumbnailUrl
contentUrl  embedUrl
duration
expires
interactionStatistic
publication
regionsAllowed
hasPart
    @id
        name
        url
        startOffset    endOffset
```

* 必須
    * `"@type": "VideoObject"`
    * `description`
    * `name`
    * `thumbnailUrl`
    * `uploadDate`
* 推奨
    * `contentUrl`／`embedUrl`
    * `duration`
    * `expires`
    * `hasPart`（`Clip`）
        * `"@type": "Clip"`
        * `"@id": "Clip-1"`
        * `startOffset`
        * `endOffset`
        * `name`
        * `url`
    * `interactionStatistic`（視聴回数）
    * `publication`（LIVE）
    * `regionsAllowed`（動画が許可されている地域）

### videoClip

```
URL    startOffset-endOffset
```

* `"@type": "Clip"`
* `"@id": "Clip-1"`（インクリメントする）
* `name`（HowToのvideoならHowToのname。HowToStepのvideoならHowToStepの`name`または`text`）
* `URL`（`http://www.example.com/example?t={startOffset}`）
* ``
* ``
* ``

