class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgPerson {
    test() {
        this.#testNormal()
        this.#testWithoutUrl()
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
}
