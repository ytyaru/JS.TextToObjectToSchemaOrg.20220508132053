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

