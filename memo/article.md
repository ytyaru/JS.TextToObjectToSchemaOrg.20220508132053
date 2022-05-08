# Article

txty.txt
```
headline    image
dateModified    datePublished
著者名    著者URL    sameAsURL    ...
```

　必須要素なし。すべて推奨項目。

* `Article`、`NewsArticle`、`BlogPosting`のいずれか（`TechArticle`が使えないのが残念）


json-ld
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://google.com/article"
  },
  "headline": "Article headline",
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
  ],
  "datePublished": "2015-02-05T08:00:00+08:00",
  "dateModified": "2015-02-05T09:20:00+08:00",
  "author": {
    "@type": "Person",
    "name": "John Doe",
    "url": "http://example.com/profile/johndoe123"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Google",
    "logo": {
      "@type": "ImageObject",
      "url": "https://google.com/logo.jpg"
    }
  }
}
</script>
```
