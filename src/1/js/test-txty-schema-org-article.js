class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgArticle {
    test() {
        this.#testFull()
    }
    #testFull() {
        const txt = `
見出し    https://example.com/eye-catch-16x9.jpg    https://example.com/eye-catch-4x3.jpg    https://example.com/eye-catch-1x1.jpg
2022-01-01T00:00:00+09:00    2022-02-02T00:00:00+09:00
著者名    https://example.com/author.html    https://twitter.com/author    https://facebook.com/author
`
        const actual = new TxtySchemaOrgArticle().generate(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('headline'))
        console.assert(actual.hasOwnProperty('image'))
        console.assert(actual.hasOwnProperty('dateModified'))
        console.assert(actual.hasOwnProperty('datePublished'))
        console.assert(actual.hasOwnProperty('author'))
        console.assert(actual.author.hasOwnProperty('name'))
        console.log(actual.author)
        console.assert(actual.author.hasOwnProperty('url'))
        
        console.assert('見出し' === actual.headline)
        console.assert(Array.isArray(actual.image))
        console.assert(3 === actual.image.length)
        console.assert('https://example.com/eye-catch-16x9.jpg' === actual.image[0])
        console.assert('https://example.com/eye-catch-4x3.jpg' === actual.image[1])
        console.assert('https://example.com/eye-catch-1x1.jpg' === actual.image[2])
//        console.assert(Date.parse('2022-01-01T00:00:00+09:00') === actual.datePublished)
//        console.assert(Date.parse('2022-02-02T00:00:00+09:00') === actual.dateModified)
        console.assert('2022-01-01T00:00:00+09:00' === actual.datePublished)
        console.assert('2022-02-02T00:00:00+09:00' === actual.dateModified)
        console.assert('object' === typeof actual.author)
        console.assert('著者名' === actual.author.name)
        console.assert('https://example.com/author.html' === actual.author.url)
        console.assert(Array.isArray(actual.author.sameAs))
        console.assert(2 === actual.author.sameAs.length)
        console.assert('https://twitter.com/author' === actual.author.sameAs[0])
        console.assert('https://facebook.com/author' === actual.author.sameAs[1])
        console.log(JSON.stringify(actual))
    }
}
