class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgDataset {
    test() {
        this.#testParseItemNameOnly()
        this.#testParseItemMinimu()
        this.#testParseItemUrl1()
        this.#testParseItemUrl2()
        this.#testParseItemUrl3()
//        this.#testParseItemUrlFormat()
    }
    #testParseItemNameOnly() {
        const errorType = TxtySchemaOrgDatasetError
        const message = `引数itemは1つ以上のoptions要素をもった配列であるべきです。1つ目が「データセット説明」、2つ目以降が「ダウンロードURL」であることを期待します。`
        try {
            const txt = `データセット名`
            const actual = new TxtySchemaOrgDataset().parseFromItem(Txty.item(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testParseItemMinimu() {
        const name = `データセット名`
        const description = `データセットの説明文。`
        const txt = `${name}    ${description}`
        const actual = new TxtySchemaOrgDataset().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(!actual.hasOwnProperty('distribution'))
        console.assert(!actual.hasOwnProperty('isAccessibleForFree'))
        //console.assert(true === actual.isAccessibleForFree)
    }
    #testParseItemUrl1() {
        const name = `データセット名`
        const description = `データセットの説明文。`
        const ext = `csv`
        const url = `https://example.com/category/some-data.${ext}`
        const txt = `${name}    ${description}    ${url}`
        const actual = new TxtySchemaOrgDataset().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(Array.isArray(actual.distribution))
        console.assert(1 === actual.distribution.length)
        console.assert('DataDownload' === actual.distribution[0]['@type'])
        console.assert(url === actual.distribution[0].contentUrl)
        console.assert(ext === actual.distribution[0].encodingFormat)
    }
    #testParseItemUrl2() {
        const name = `データセット名`
        const description = `データセットの説明文。`
        //const ext = `csv`
        //const url = `https://example.com/category/some-data.${ext}`
        const exts = ['csv', 'xml']
        const urls = exts.map(ext=>`https://example.com/category/some-data.${ext}`)
        const txt = `${name}    ${description}    ${urls[0]}    ${urls[1]}`
        const actual = new TxtySchemaOrgDataset().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(Array.isArray(actual.distribution))
        console.assert(2 === actual.distribution.length)
        console.assert('DataDownload' === actual.distribution[0]['@type'])
        console.assert(urls[0] === actual.distribution[0].contentUrl)
        console.assert(exts[0] === actual.distribution[0].encodingFormat)
        console.assert(urls[1] === actual.distribution[1].contentUrl)
        console.assert(exts[1] === actual.distribution[1].encodingFormat)
    }
    #testParseItemUrl3() {
        const name = `データセット名`
        const description = `データセットの説明文。`
        //const ext = `csv`
        //const url = `https://example.com/category/some-data.${ext}`
        const exts = ['csv', 'xml', 'json']
        const urls = exts.map(ext=>`https://example.com/category/some-data.${ext}`)
        const txt = `${name}    ${description}    ${urls[0]}    ${urls[1]}    ${urls[2]}`
        const actual = new TxtySchemaOrgDataset().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(Array.isArray(actual.distribution))
        console.assert(3 === actual.distribution.length)
        console.assert('DataDownload' === actual.distribution[0]['@type'])
        console.assert(urls[0] === actual.distribution[0].contentUrl)
        console.assert(exts[0] === actual.distribution[0].encodingFormat)
        console.assert(urls[1] === actual.distribution[1].contentUrl)
        console.assert(exts[1] === actual.distribution[1].encodingFormat)
        console.assert(urls[2] === actual.distribution[2].contentUrl)
        console.assert(exts[2] === actual.distribution[2].encodingFormat)
    }

}
