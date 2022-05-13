class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgDataDownload {
    test() {
        this.#testParseTextBlank()
        this.#testParseTextUrl()
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
        const errorType = TypeError
        const message = `Failed to construct 'URL': Invalid URL`
        const actual = new TxtySchemaOrgDataDownload().parse(input)
        console.log(actual)
        console.assert('DataDownload' === actual['@type'])
        console.assert(input === actual.contentUrl)
        console.assert(ext === actual.encodingFormat)
    }
}
