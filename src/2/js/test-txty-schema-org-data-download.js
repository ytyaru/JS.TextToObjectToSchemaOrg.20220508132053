class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgDataDownload {
    test() {
        this.#testParseTextBlank()
        this.#testParseTextUrl()
        this.#testParseTextUrlFormat()
        this.#testParseItemUrl()
        this.#testParseItemUrlFormat()
    }
    #testParseTextBlank() {
        const input = ``
        const errorType = TypeError
        const message = `Failed to construct 'URL': Invalid URL`
        try {
            const actual = new TxtySchemaOrgDataDownload().parse(input) 
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testParseTextUrl() {
        const ext = `csv`
        const input = `https://example.com/category/some-data.${ext}`
        const actual = new TxtySchemaOrgDataDownload().parse(input)
        console.log(actual)
        console.assert('DataDownload' === actual['@type'])
        console.assert(input === actual.contentUrl)
        console.assert(ext === actual.encodingFormat)
    }
    #testParseTextUrlFormat() {
        const ext = `csv`
        const url = `https://example.com/category/some-data.${ext}`
        const format = `CSV`
        const actual = new TxtySchemaOrgDataDownload().parse(url, format)
        console.log(actual)
        console.assert('DataDownload' === actual['@type'])
        console.assert(url === actual.contentUrl)
        console.assert(format === actual.encodingFormat)
    }
    #testParseItemUrl() {
        const ext = `csv`
        const url = `https://example.com/category/some-data.${ext}`
        const txt = `${url}`
        const actual = new TxtySchemaOrgDataDownload().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('DataDownload' === actual['@type'])
        console.assert(url === actual.contentUrl)
        console.assert(ext === actual.encodingFormat)
    }
    #testParseItemUrlFormat() {
        const ext = `csv`
        const url = `https://example.com/category/some-data.${ext}`
        const format = `CSV`
        const txt = `${url}    ${format}`
        const actual = new TxtySchemaOrgDataDownload().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('DataDownload' === actual['@type'])
        console.assert(url === actual.contentUrl)
        console.assert(format === actual.encodingFormat)
    }
}
