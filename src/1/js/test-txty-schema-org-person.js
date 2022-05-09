class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgPerson {
    test() {
        this.#testNormal()
        this.#testWithoutUrl()

        this.#testBlank()
        this.#testMinimum()
        this.#testNameUrl()
        this.#testNameUrlSameAs()
    }
    #testNormal() {
        const name = '著者名'
        const url = 'https://example.com/author.html'
        const actual = new TxtySchemaOrgPerson().parse(name, url) 
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('Person' === actual['@type'])

        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('url'))
        console.log(JSON.stringify(actual))
    }
    #testWithoutUrl() {
        const name = '著者名'
        const actual = new TxtySchemaOrgPerson().parse(name) 
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('Person' === actual['@type'])

        console.assert(actual.hasOwnProperty('name'))
        console.assert(!actual.hasOwnProperty('url'))
        console.log(JSON.stringify(actual))
    }
    #testBlank() {
        try { const store = Txty.store(''); }
        catch (e) {
            if (!(e instanceof TxtyStoreError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数linesは空白文字以外が1字以上ある文字列の要素が1つ以上必要です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testMinimum() {
        const txt = `著者名`
        const item = Txty.store(txt)[0]
        const actual = new TxtySchemaOrgPerson().parseFromItem(item)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('Person' === actual['@type'])

        console.assert(actual.hasOwnProperty('name'))
        console.assert(!actual.hasOwnProperty('url'))
        console.assert(!actual.hasOwnProperty('sameAs'))
        console.assert('著者名' === actual.name)
        console.log(JSON.stringify(actual))
    }
    #testNameUrl() {
        const name = '著者名'
        const url = 'https://example.com/author.html'
        const txt = `${name}    ${url}`
        const item = Txty.store(txt)[0]
        const actual = new TxtySchemaOrgPerson().parseFromItem(item)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('Person' === actual['@type'])

        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('url'))
        console.assert(!actual.hasOwnProperty('sameAs'))
        console.assert(name === actual.name)
        console.assert(url === actual.url)
        console.log(JSON.stringify(actual))
    }
    #testNameUrlSameAs() {
        const name = '著者名'
        const url = 'https://example.com/author.html'
        const sameAs = ['https://twitter.com/author', 'https://facebook.com/author']
        const txt = `${name}    ${url}    ${sameAs[0]}    ${sameAs[1]}`
        const item = Txty.store(txt)[0]
        const actual = new TxtySchemaOrgPerson().parseFromItem(item)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('Person' === actual['@type'])

        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('sameAs'))
        console.assert(name === actual.name)
        console.assert(url === actual.url)
        console.assert(Array.isArray(actual.sameAs))
        console.assert(2 === actual.sameAs.length)
        console.assert('https://twitter.com/author' === actual.sameAs[0])
        console.assert('https://facebook.com/author' === actual.sameAs[1])
        console.log(JSON.stringify(actual))
    }
}
