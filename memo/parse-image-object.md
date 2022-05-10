# ImageObject

　各schema.orgには画像を指定するとき、以下のパターンがありうる。

Articleのアイキャッチ画像（アスペクト比）
```javascript
"image": ["https://16x9.png", "https://4x3.png", "https://1x1.png"]
```

HowTo時の画像（URL版）
```javascript
"image": "https://image.png"
```

HowTo時の画像（ImageObject版）
```javascript
"image": {
  "@type": "ImageObject",
  "url": "https://example.com/photos/1x1/photo-step1.jpg",
  "height": "406",
  "width": "305"
}
```

画像検索時のライセンス
```javascript
{
  "@context": "https://schema.org/",
  "@type": "ImageObject",
  "contentUrl": "https://example.com/photos/1x1/adult-black-labrador.jpg",
  "license": "https://example.com/license",
  "acquireLicensePage": "https://example.com/how-to-use-my-images"
}
```

ImageObject複合版
```
{
  "@type": "ImageObject",
  "url": "https://example.com/photos/1x1/photo-step1.jpg",
  "height": "406",
  "width": "305"
  "contentUrl": "https://example.com/photos/1x1/photo-step1.jpg",
  "license": "https://example.com/license",
  "acquireLicensePage": "https://example.com/how-to-use-my-images"
}
```

Txty.Store
```
URL
width    height
license
acquireLicensePage
```

Txty.Item A
```
URL    widthxheight
```
```
URL    license
```

Txty.Item B
```
URL    license    acquireLicensePage
```
```
URL    widthxheight    license
URL    license    widthxheight
```


Txty.Item C
```
URL    widthxheight    license    acquireLicensePage
URL    license    acquireLicensePage    widthxheight
```

