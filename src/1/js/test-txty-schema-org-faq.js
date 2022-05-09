class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgFaq {
    test() {
        this.#testBlank()
        this.#testStore1Only()
        this.#testStore2()
        /*
        this.#testHeadingOnly()
        this.#testHeadingImage()
        this.#testHeadingImage3()
        this.#testHeadingPublished()
        this.#testHeadingPublishedModified()
        this.#testHeadingModifiedPublished()
        this.#testHeadingAuthor()
        this.#testFull()
        */
    }
    #testBlank() {
        try { /*Txty.store('');*/ new TxtySchemaOrgFaq().parse(''); }
        catch (e) {
            if (!(e instanceof TxtyStoreError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数linesは空白文字以外が1字以上ある文字列の要素が1つ以上必要です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStore1Only() {
        const txt = `質問文。`
        try { new TxtySchemaOrgFaq().parse(txt); }
        catch (e) {
            if (!(e instanceof TxtySchemaOrgQuestionError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数storeは2つの要素をもった配列であるべきです。1つ目が質問、2つ目が答えであることを期待します。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStore2() {
        const txt = `
質問文。
回答文。`
        const actual =  new TxtySchemaOrgFaq().parse(txt);
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('FAQPage' === actual['@type'])

        console.assert(actual.hasOwnProperty('mainEntity'))
        console.assert(Array.isArray(actual.mainEntity))
        console.assert(1 === actual.mainEntity.length)

        console.assert(!actual.mainEntity[0].hasOwnProperty('@context'))
        console.assert(actual.mainEntity[0].hasOwnProperty('@type'))
        console.assert('Question' === actual.mainEntity[0]['@type'])
        console.assert(actual.mainEntity[0].hasOwnProperty('name'))
        console.assert('質問文。' === actual.mainEntity[0].name)

        console.assert(actual.mainEntity[0].hasOwnProperty('acceptedAnswer'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('@type'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('text'))
        console.assert('Answer' === actual.mainEntity[0].acceptedAnswer['@type'])
        console.assert('回答文。' === actual.mainEntity[0].acceptedAnswer.text)
    }
    /*
    #testHeadingOnly() {
        const txt = `見出し`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('dateModified'))
        console.assert(!actual.hasOwnProperty('datePublished'))
        console.assert(!actual.hasOwnProperty('author'))
        console.assert('見出し' === actual.headline)
        console.log(JSON.stringify(actual))
    }
    #testHeadingImage() {
        const txt = `見出し    https://example.com/eye-catch-16x9.jpg`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('dateModified'))
        console.assert(!actual.hasOwnProperty('datePublished'))
        console.assert(!actual.hasOwnProperty('author'))
        
        console.assert('見出し' === actual.headline)
        console.assert(Array.isArray(actual.image))
        console.assert(1 === actual.image.length)
        console.assert('https://example.com/eye-catch-16x9.jpg' === actual.image[0])
        console.log(JSON.stringify(actual))
    }
    #testHeadingImage3() {
        const txt = `見出し    https://example.com/eye-catch-16x9.jpg    https://example.com/eye-catch-4x3.jpg    https://example.com/eye-catch-1x1.jpg`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('dateModified'))
        console.assert(!actual.hasOwnProperty('datePublished'))
        console.assert(!actual.hasOwnProperty('author'))
        
        console.assert('見出し' === actual.headline)
        console.assert(Array.isArray(actual.image))
        console.assert(3 === actual.image.length)
        console.assert('https://example.com/eye-catch-16x9.jpg' === actual.image[0])
        console.assert('https://example.com/eye-catch-4x3.jpg' === actual.image[1])
        console.assert('https://example.com/eye-catch-1x1.jpg' === actual.image[2])
        console.log(JSON.stringify(actual))
    }
    #testHeadingPublished() {
        const txt = `見出し\n2022-01-01T00:00:00+09:00`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('dateModified'))
        console.assert(actual.hasOwnProperty('datePublished'))
        console.assert(!actual.hasOwnProperty('author'))
        
        console.assert('見出し' === actual.headline)
        console.assert('2022-01-01T00:00:00+09:00' === actual.datePublished)
        console.log(JSON.stringify(actual))
    }
    #testHeadingPublishedModified() {
        const txt = `見出し
2022-01-01T00:00:00+09:00    2022-02-02T00:00:00+09:00`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(actual.hasOwnProperty('dateModified'))
        console.assert(actual.hasOwnProperty('datePublished'))
        console.assert(!actual.hasOwnProperty('author'))
        
        console.assert('見出し' === actual.headline)
        console.assert('2022-01-01T00:00:00+09:00' === actual.datePublished)
        console.assert('2022-02-02T00:00:00+09:00' === actual.dateModified)
        console.log(JSON.stringify(actual))
    }
    #testHeadingModifiedPublished() {
        const txt = `見出し
2022-02-02T00:00:00+09:00    2022-01-01T00:00:00+09:00`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(actual.hasOwnProperty('dateModified'))
        console.assert(actual.hasOwnProperty('datePublished'))
        console.assert(!actual.hasOwnProperty('author'))
        
        console.assert('見出し' === actual.headline)
        console.assert('2022-01-01T00:00:00+09:00' === actual.datePublished)
        console.assert('2022-02-02T00:00:00+09:00' === actual.dateModified)
        console.log(JSON.stringify(actual))
    }
    #testHeadingAuthor() {
        const txt = `見出し
著者名（ISO8061形式でない文字列）`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('dateModified'))
        console.assert(!actual.hasOwnProperty('datePublished'))
        console.assert(actual.hasOwnProperty('author'))
        console.assert(actual.author.hasOwnProperty('name'))
        console.assert(!actual.author.hasOwnProperty('url'))
        console.assert(!actual.author.hasOwnProperty('sameAs'))
        
        console.assert('見出し' === actual.headline)
        console.assert('著者名（ISO8061形式でない文字列）' === actual.author.name)
        console.log(JSON.stringify(actual))
    }
    #testFull() {
        const txt = `
見出し    https://example.com/eye-catch-16x9.jpg    https://example.com/eye-catch-4x3.jpg    https://example.com/eye-catch-1x1.jpg
2022-01-01T00:00:00+09:00    2022-02-02T00:00:00+09:00
著者名    https://example.com/author.html    https://twitter.com/author    https://facebook.com/author
`
        const actual = new TxtySchemaOrgFaq().parse(txt)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Faq' === actual['@type'])

        console.assert(actual.hasOwnProperty('headline'))
        console.assert(actual.hasOwnProperty('image'))
        console.assert(actual.hasOwnProperty('dateModified'))
        console.assert(actual.hasOwnProperty('datePublished'))
        console.assert(actual.hasOwnProperty('author'))
        console.assert(actual.author.hasOwnProperty('name'))
        console.assert(actual.author.hasOwnProperty('url'))
        console.assert(actual.author.hasOwnProperty('sameAs'))
        
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
    */
}
