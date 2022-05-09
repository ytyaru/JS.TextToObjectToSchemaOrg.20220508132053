# Person

```
名前    url     sameAsURL...
```

　sameAsURLはTwitterなど同一人物を指す他のURLである。

　将来、画像URLを含めることになっても、URLの末尾がファイル拡張子であるか否かで判定できる。

```
名前    url     sameAsURL...    imageURL...
```

　名前だけは必須。それ以降は任意。

```javascript
const txt = `ytyaru    https://ytyaru.html    https://twitter.com/ytyaru1    https://profile.hatena.ne.jp/ytyaru/    https://ytyaru-1x1.png    https://ytyaru-4x3.png    https://ytyaru-16x9.png`
const content = Txty.line(txt)
const author = SchemaOrg.Person(content)
author.name   // string   'ytyaru'
author.url    // string   'https://ytyaru.html'
author.sameAs // [string] ['https://twitter.com/ytyaru1', 'https://profile.hatena.ne.jp/ytyaru/']
author.image  // [string] ['https://ytyaru-1x1.png', 'https://ytyaru-4x3.png', 'https://ytyaru-16x9.png']
```

