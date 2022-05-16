# SoftwareApplication, MobileApplication, WebApplication, VideoGame

* Review(Rating) 
* AggregateRating

```javascript
'@type': 'SoftwareApplication'
```

```javascript
'@type': 'MobileApplication'
```

```javascript
'@type': 'WebApplication'
```

```javascript
'@type': ['VideoGame', 'SoftwareApplication']
```

```javascript
'@type': ['VideoGame', 'MobileApplication']
```

```javascript
'@type': ['VideoGame', 'WebApplication']
```

```javascript
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Angry Birds",
      "operatingSystem": "ANDROID",
      "applicationCategory": "GameApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",
        "ratingCount": "8864"
      },
      "offers": {
        "@type": "Offer",
        "price": "1.00",
        "priceCurrency": "USD"
      }
    }
    </script>
```

Item
```
アプリ名
```

Store
```
アプリ名
価格

```

## AggregateRating

```
ratingCount    reviewCount    ratingValue
```

```
3    2    100%
```

```
ratingCount    reviewCount    ratingValue    worstRating..bestRating
```

```
7    3    88    0..100
```


```
ratingCount    
reviewCount
ratingValue
```

必須

* itemReviewed
    * name
* ratingCount
* reviewCount
* ratingValue

推奨

* bestRating
* worstRating
 
```javascript
{
  "@context": "https://schema.org/",
  "@type": "Game",
  "name": "Firefly",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "88",
    "bestRating": "100",
    "ratingCount": "20"
  }
}
```

### Rating

* https://schema.org/Rating
    * https://schema.org/AggregateRating
    * https://schema.org/Review

　Schema.orgにおける`ratingValue`は`[0-9.]`の字を使った整数または実数である。なのにGoogleでは分数や百分率も使えるという。おそらくそれはGoogle側独自の便利機能だろう。

　どのように実装すべきか。Google側にあわせるか、それともschema.org側にあわせるか。できるだけ簡単な実装にしたい。[1-5]のいずれかのみで評価するのが最も簡単だ。もし拡張するなら百分率を使いたい。worstRatingやbestRatingを指定して`[1-5]`の範囲そのものを変えることもできるようにしたい。でも、そこまで細かく設定しても使わなそう。

```javascript
class RatingValue { // 整数、実数、分数、百分率
    constructor(text, min=1, max=5) {
        this.text = text
        this.value = text
        this.min = min
        this.max = max
    }
    get Max() { return this.max }
    get Min() { return this.min }
    get Text(text) { return this.value }
    set Text(text) {

    }
    get Value() { return this.value }
}
```

## Review

必須

* author（100字未満）
* itemReviewed
    * name
* reviewRating（Rating, AggregateRating）
    * ratingValue（数字、分数、パーセンテージ（4, 6/10, 60%））

推奨

* datePublished
* reviewRating
    * bestRating
    * worstRating

以下も必要だと思う。

* name
* reviewBody

```
100%    著者名    著者URL    レビュー名    レビュー内容。    
```
```
ratingValue
著者名    url
レビュー名
レビュー内容。
```

```javascript
{
  "@context": "https://schema.org/",
  "@type": "Game",
  "name": "Firefly",
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
    "reviewBody": "I really enjoyed this game. You
    get to capture fireflies and put them in jars."
  }
}
```



## 
## 

```javascript
'@type': ''
```

```javascript
'@type': ''
```

