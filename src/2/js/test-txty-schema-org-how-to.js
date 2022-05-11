class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgHowTo {
    test() {
//        this.#testNormal()
//        this.#testWithoutUrl()

        this.#testBlank()
        this.#testMinimum()
        this.#testNameUrl()
        this.#testNameUrlSameAs()
    }
    /*
    #testNormal() {
        const name = '著者名'
        const url = 'https://example.com/author.html'
        const actual = new TxtySchemaOrgHowTo().parse(txt) 
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('HowTo' === actual['@type'])

        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('url'))
        console.log(JSON.stringify(actual))
    }
    #testWithoutUrl() {
        const name = '著者名'
        const actual = new TxtySchemaOrgHowTo().parse(name) 
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('HowTo' === actual['@type'])

        console.assert(actual.hasOwnProperty('name'))
        console.assert(!actual.hasOwnProperty('url'))
        console.log(JSON.stringify(actual))
    }
    */

    #testError(input, errorType, message) {
        try {
            const actual = new TxtySchemaOrgHowTo().parseFromComposite(input) 
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }

    }
    #testBlank() {
        this.#testError(``, TxtySchemaOrgHowToError, `引数compoは配列であるべきです。Txty.composite()の戻り値を期待します。`)
        /*
        const actual = new TxtySchemaOrgHowTo().parse(name) 
        try { const store = Txty.store(''); }
        catch (e) {
            if (!(e instanceof TxtyStoreError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数linesは空白文字以外が1字以上ある文字列の要素が1つ以上必要です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
        */
    }
    #testMinimum() {
        const txt = `著者名`
        const item = Txty.store(txt)[0]
        const actual = new TxtySchemaOrgHowTo().parseFromItem(item)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('HowTo' === actual['@type'])

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
        const actual = new TxtySchemaOrgHowTo().parseFromItem(item)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('HowTo' === actual['@type'])

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
        const actual = new TxtySchemaOrgHowTo().parseFromItem(item)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        //console.assert('https://schema.org' === actual['@context'])
        console.assert('HowTo' === actual['@type'])

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
