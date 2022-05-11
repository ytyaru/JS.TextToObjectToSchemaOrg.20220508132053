# サブタイプ

　schema.org生成コードを書いているうち、特殊な値の指定がいくつかあることに気づいた。それらを独自のclassとしてバリデートなど適切な処理をするようなサブタイプを作りたくなってきたので、情報をまとめておく。

## 一覧

型|説明
--|----
Duration|時間における期間。`PT1Y2M3D12H34M56S`（1年2ヶ月3日間12時間34分56秒）
Range|数値における範囲。`Range(start, end)`
Rocket|`==`,`<`,`>`における条件分岐。`roc = new Rocket(閾値, 実際値); roc.isGreater, isEqual, isLess。roc.route((r)=>); r.greater(()=>'赤点回避！'); r.less(()=>'赤点！'); r.equal(()=>'ギリアウト赤点！');`

## Duration

　時間間隔の書式は４つある。これらを相互変換したい。

* ISO8601の`PT1Y2M3D12H34M56S`
* `hh:mm:ss`（`hh:mm`,`mm:ss`,`hh:mm:`,`:mm:ss`）
* `sssss`
* `Date`型

```javascript
duration = {
    years: 1,
    months: 2,
    weeks: ?,
    days: 3,
    hours: 4,
    minutes: 5,
    seconds: 6,
}
```

```
1year = 365days
1month = 30days
1week = 7days
1day = 24hours
1hour = 60minutes
1minute = 60seconds
```

　すべて`Number`型である。これは少数値も受け入れるため。`parseInt()`,`parseFloat()`せず`Number()`する。

```javascript
toIsoDurationOverflow(123456, Duration.Unit.Minute) // PT2057.6M
toIsoDuration(123456) // PT1D10H08M06S
toIsoDatetime(123456) // 0000-00-01T10:08:06Z
toIsoTime(123456) // 10:08:06
toText(123456) // 1d 10h 8m 6s
toText(123456, 'en-us') // 1d 10h 8m 6s
toText(123456, 'ja-jp') // 1日10時間8分6秒
toText(123456, 'en-us', Duration.Text.Long) // 1days 10hours 8minutes 6seconds
toTextOverflow(123456, 'en-us', Duration.Text.Short, Duration.Unit.Minute) // 2057.6m
```

## Range

```javascript
const r = new Range(開始, 終了)
if (r.in(v)) {} // 範囲内である
r.gen() // [開始, 開始+1, 開始+2, ..., 終了], [開始, 開始-1, 開始-2, ..., 終了]
r.Begin // 開始
r.End   // 終了
```

　コンストラクタで例外が発生しうる。けれど他の言語ではコンストラクタで例外をスローできない。JSはどうなのか。

　テキストから範囲を取得する。

```javascript
const r = new Range(`10..22`)
if (r.in(v)) {} // 範囲内である
r.gen() // [開始, 開始+1, 開始+2, ..., 終了], [開始, 開始-1, 開始-2, ..., 終了]
r.Begin // 開始 10
r.End   // 終了 22
```

　`10-22`のようにメタ文字は`-`でもよかったかもしれないが、マイナス値を示すときの`-`と重複するのが気がかり。たとえば`-2--5`のようになるとわかりにくい。なので`..`にした。これなら`-2..-5`のようになり視認性もよい。

　開始、終了に加えてステップ値を指定できたほうがよいかもしれない。

```javascript
const r = new Range(開始, 終了, ステップ)
const r = new Range(`10..22`, 3)
if (r.in(v)) {} // 範囲内である
r.gen() // [開始, 開始+1, 開始+2, ..., 終了], [開始, 開始-1, 開始-2, ..., 終了]
r.Begin // 開始
r.End   // 終了
```

　ステップ値は`10..22+3`のように末尾の`+3`で表現してもよかったかもしれない。けれどマイナス値のときは紛らわしくなる。`-2..-55-3`のように。また、`-2..-55+3`のように減少するはずなのにステップ値は加算するような表記もできてしまう。このときどのように動作するのか不明瞭である。-2から開始して3ずつ減るのか、-55から開始して3ずつ増えるのか、ステップを無視して-2から開始し1ずつ減るのか。なのでステップ値は別の引数として受け取ることにする。このとき方向がプラス／マイナスのどちらであるかは、開始と終了の大小関係によって決まる。開始のほうが小さければ増える。開始のほうが小さければ減る。

## Rocket

```javascript
const r = Rocket(閾値, 超過時, 同値時, 不足時) // number(actual), number(threshold), function, function, function
r.jadge(実際値) // 実際値が閾値と比べて超過, 同値, 不足であるときそれぞれの関数を実行する
```
```javascript
const threshold = 30
const r = Rocket(threshold, ()=>'超過', ()=>'イコール', ()=>'不足') // actual, threshold, 超過時, イコール時, 不足時
r.route(actual) // 超過時, 同値時, 不足時のいずれかひとつを実行する
```

　ようするに以下の条件式によるルーティングを肩代わりしたもの。

```javascript
if (threshold < actual) { return greater(); }
else if (threshold > actual) { return less(); }
else { return equal(); }
```

## Match

```javascript
return returnValues[candidates.findIndex(target)]
```
```javascript
candidates = [1, 2, 3]
returnValues = ['すごい', 'ふつう', 'しょぼい', '不正値']
const m = new Match(returnValues,  candidates)
const v = 1
m.match(v) // 'すごい'が返る
```


```javascript
const m = new Match()
```


```javascript
rocket(実際値, 閾値) // 
rocket(1, 1) // 0
rocket(1, 2) // -1
rocket(2, 1) // 1
``
const r = Rocket(実際値, 閾値) // actual, threshold
const r = Rocket(実際値, 閾値, 超過時, イコール時, 不足時) // actual, threshold, function, function, function
const r = Rocket(1, 1, (a,t)=>'超過', (a,t)=>'イコール', (a,t)=>'不足') // actual, threshold, 超過時, イコール時, 不足時
const r = Rocket(1, 1, ()=>'超過', ()=>'イコール', ()=>'不足') // actual, threshold, 超過時, イコール時, 不足時
const r = Rocket(1, 1, (a)=>`超過:${a}`, (a)=>`イコール:${a}`, (a)=>`不足:${a}`) // actual, threshold, 超過時, イコール時, 不足時
const r = Rocket(実際値, 超過時, イコール時, 不足時) // actual, threshold, function, function, function
const r = Rocket(1, ()=>'超過', ()=>'イコール', ()=>'不足') // actual, threshold, 超過時, イコール時, 不足時
r.Threshold = 3
r.jadge(actual) // 超過時, 同値時, 不足時のいずれかひとつを実行する
```

r.greater((a,t)=>'クリア')
r.equal()
r.less()

rocket(1, 1) // 0
rocket(1, 2) // -1
rocket(2, 1) // 1
``

