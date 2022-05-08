class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgPerson {
    test() {
        this.#testNormal()
        this.#testWithoutUrl()

        this.#testMinimum()
        this.#testNameUrl()
        this.#testNameUrlSameAs()
    }
    #testNormal() {
        const name = '著者名'
        const url = 'https://example.com/author.html'
        const actual = new TxtySchemaOrgPerson().generate(name, url) 
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('url'))
        console.log(JSON.stringify(actual))
    }
    #testWithoutUrl() {
        const name = '著者名'
        const actual = new TxtySchemaOrgPerson().generate(name) 
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(!actual.hasOwnProperty('url'))
        console.log(JSON.stringify(actual))
    }
    #testMinimum() {
        const txt = `著者名`
        const txtyObj = Txty.lines(txt)[0][0]
        const actual = new TxtySchemaOrgPerson().generateFromTxty(txtyObj)
        console.log(actual)
        console.assert('object' === typeof actual)
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
        const txtyObj = Txty.lines(txt)[0][0]
        const actual = new TxtySchemaOrgPerson().generateFromTxty(txtyObj)
        console.log(actual)
        console.assert('object' === typeof actual)
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
        const txtyObj = Txty.lines(txt)[0][0]
        const actual = new TxtySchemaOrgPerson().generateFromTxty(txtyObj)
        console.log(actual)
        console.assert('object' === typeof actual)
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
