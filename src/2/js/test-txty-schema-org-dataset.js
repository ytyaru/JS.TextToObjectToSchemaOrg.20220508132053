class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgDataset {
    test() {
        this.#testParseItemNameOnly()
        this.#testParseItemMinimu()
        this.#testParseItemUrl1()
        this.#testParseItemUrl2()
        this.#testParseItemUrl3()

        this.#testParseItemShortDescriptionError()
        this.#testParseItemLongDescriptionError()
        this.#testParseStoreShortDescriptionError()
        this.#testParseStoreLongDescriptionError()

        this.#testParseStoreNameOnly()
        this.#testParseStoreMinimum()
        this.#testParseStoreOption1()
        this.#testParseStoreOption2()
        this.#testParseStoreOption3()
        this.#testParseStoreOption4()
        this.#testParseStoreOption5()

        this.#testParseStoreUrl1()
        this.#testParseStoreUrlFormat1()
        this.#testParseStoreUrlFormat3()
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
    #testParseItemShortDescriptionError() {
        const errorType = TxtySchemaOrgDatasetError
        const message = `説明文は50〜5000字以内であるべきです。:18\nhttps://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        try {
            const name = `データセット名`
            const description = `50〜5000字より短いためエラー。`
            const txt = `${name}    ${description}`
            const actual = new TxtySchemaOrgDataset().parseFromItem(Txty.item(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testParseItemLongDescriptionError() {
        const errorType = TxtySchemaOrgDatasetError
        const message = `説明文は50〜5000字以内であるべきです。:5001\nhttps://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        try {
            const name = `データセット名`
            const description = `a`.repeat(5001)
            const txt = `${name}    ${description}`
            const actual = new TxtySchemaOrgDataset().parseFromItem(Txty.item(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testParseStoreShortDescriptionError() {
        const errorType = TxtySchemaOrgDatasetError
        const message = `説明文は50〜5000字以内であるべきです。:18\nhttps://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        try {
            const name = `データセット名`
            const description = `50〜5000字より短いためエラー。`
            const txt = `${name}\n${description}`
            const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testParseStoreLongDescriptionError() {
        const errorType = TxtySchemaOrgDatasetError
        const message = `説明文は50〜5000字以内であるべきです。:5001\nhttps://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        try {
            const name = `データセット名`
            const description = `a`.repeat(5001)
            const txt = `${name}\n${description}`
            const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
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
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
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
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
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
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
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
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
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
    #testParseStoreNameOnly() {
        const errorType = TxtySchemaOrgDatasetError
        const message = `引数storeは2つ以上の要素をもった配列であるべきです。1つ目が「データセット名    URL    License    creator.name    creator.url    isNotFree」、2つ目が「データセット説明」、3つ目以降が「URL    書式」であることを期待します。`
        try {
            const txt = `データセット名`
            const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testParseStoreMinimum() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const txt = `${name}\n${description}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(!actual.hasOwnProperty('distribution'))
        console.assert(!actual.hasOwnProperty('license'))
        console.assert(!actual.hasOwnProperty('creator'))
        console.assert(actual.hasOwnProperty('isAccessibleForFree'))
        console.assert(true === actual.isAccessibleForFree)
    }
    #testParseStoreOption1() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const url = `https://example.com/dataset.html`
        const txt = `${name}    ${url}\n${description}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(!actual.hasOwnProperty('distribution'))
        console.assert(!actual.hasOwnProperty('license'))
        console.assert(!actual.hasOwnProperty('creator'))
        console.assert(actual.hasOwnProperty('isAccessibleForFree'))
        console.assert(true === actual.isAccessibleForFree)
    }
    #testParseStoreOption2() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const url = `https://example.com/dataset.html`
        const license = `https://example.com/license.html`
        const txt = `${name}    ${url}    ${license}\n${description}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(license === actual.license)
        console.assert(!actual.hasOwnProperty('distribution'))
        console.assert(!actual.hasOwnProperty('creator'))
        //console.assert(!actual.hasOwnProperty('license'))
        console.assert(actual.hasOwnProperty('isAccessibleForFree'))
        console.assert(true === actual.isAccessibleForFree)
    }
    #testParseStoreOption3() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const url = `https://example.com/dataset.html`
        const license = `https://example.com/license.html`
        const authorName = `著者名`
        const txt = `${name}    ${url}    ${license}    ${authorName}\n${description}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(license === actual.license)
        console.assert('Person' === actual.creator['@type'])
        console.assert(authorName === actual.creator.name)
        console.assert(!actual.creator.hasOwnProperty('url'))
        console.assert(!actual.hasOwnProperty('distribution'))
        console.assert(actual.hasOwnProperty('isAccessibleForFree'))
        console.assert(true === actual.isAccessibleForFree)
    }
    #testParseStoreOption4() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const url = `https://example.com/dataset.html`
        const license = `https://example.com/license.html`
        const authorName = `著者名`
        const authorUrl = `https://example.com/author.html`
        const txt = `${name}    ${url}    ${license}    ${authorName}    ${authorUrl}\n${description}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(license === actual.license)
        console.assert('Person' === actual.creator['@type'])
        console.assert(authorName === actual.creator.name)
        console.assert(authorUrl === actual.creator.url)
        console.assert(!actual.hasOwnProperty('distribution'))
        console.assert(actual.hasOwnProperty('isAccessibleForFree'))
        console.assert(true === actual.isAccessibleForFree)
    }
    #testParseStoreOption5() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const url = `https://example.com/dataset.html`
        const license = `https://example.com/license.html`
        const authorName = `著者名`
        const authorUrl = `https://example.com/author.html`
        const isNotFree = `1`
        const txt = `${name}    ${url}    ${license}    ${authorName}    ${authorUrl}    ${isNotFree}\n${description}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(license === actual.license)
        console.assert('Person' === actual.creator['@type'])
        console.assert(authorName === actual.creator.name)
        console.assert(authorUrl === actual.creator.url)
        console.assert(false === actual.isAccessibleForFree)
        console.assert(!actual.hasOwnProperty('distribution'))
    }
    #testParseStoreUrl1() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const distri = [{url:'https://example.com/dataset.csv'}]
        const url = `https://example.com/dataset.html`
        const license = `https://example.com/license.html`
        const authorName = `著者名`
        const authorUrl = `https://example.com/author.html`
        const isNotFree = `1`
        const txt = `${name}    ${url}    ${license}    ${authorName}    ${authorUrl}    ${isNotFree}
${description}
${distri[0].url}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(license === actual.license)
        console.assert('Person' === actual.creator['@type'])
        console.assert(authorName === actual.creator.name)
        console.assert(authorUrl === actual.creator.url)
        console.assert(false === actual.isAccessibleForFree)
        console.assert(actual.hasOwnProperty('distribution'))
        console.assert(Array.isArray(actual.distribution))
        console.assert(1 === actual.distribution.length)
        console.assert(distri[0].url === actual.distribution[0].contentUrl)
        console.assert('csv' === actual.distribution[0].encodingFormat)
    }
    #testParseStoreUrlFormat1() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const distri = [{url:'https://example.com/dataset.csv', format:'CSV'}]
        const url = `https://example.com/dataset.html`
        const license = `https://example.com/license.html`
        const authorName = `著者名`
        const authorUrl = `https://example.com/author.html`
        const isNotFree = `1`
        const txt = `${name}    ${url}    ${license}    ${authorName}    ${authorUrl}    ${isNotFree}
${description}
${distri[0].url}    ${distri[0].format}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(license === actual.license)
        console.assert('Person' === actual.creator['@type'])
        console.assert(authorName === actual.creator.name)
        console.assert(authorUrl === actual.creator.url)
        console.assert(false === actual.isAccessibleForFree)
        console.assert(actual.hasOwnProperty('distribution'))
        console.assert(Array.isArray(actual.distribution))
        console.assert(1 === actual.distribution.length)
        console.assert(distri[0].url === actual.distribution[0].contentUrl)
        console.assert(distri[0].format === actual.distribution[0].encodingFormat)
    }
    #testParseStoreUrlFormat3() {
        const name = `データセット名`
        const description = `データセットの説明文。50〜5000字以内であるべきです。https://developers.google.com/search/docs/advanced/structured-data/dataset?hl=ja#dataset`
        const distri = [{url:'https://example.com/dataset.csv', format:'CSV'},
                        {url:'https://example.com/dataset.xml'},
                        {url:'https://example.com/dataset.json', format:'JSON'}]
        const url = `https://example.com/dataset.html`
        const license = `https://example.com/license.html`
        const authorName = `著者名`
        const authorUrl = `https://example.com/author.html`
        const isNotFree = `1`
        const txt = `${name}    ${url}    ${license}    ${authorName}    ${authorUrl}    ${isNotFree}
${description}
${distri[0].url}    ${distri[0].format}
${distri[1].url}
${distri[2].url}    ${distri[2].format}`
        console.log(txt)
        const actual = new TxtySchemaOrgDataset().parseFromStore(Txty.store(txt))
        console.log(actual)
        console.log(JSON.stringify(actual))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Dataset' === actual['@type'])
        console.assert(name === actual.name)
        console.assert(description === actual.description)
        console.assert(url === actual.url)
        console.assert(license === actual.license)
        console.assert('Person' === actual.creator['@type'])
        console.assert(authorName === actual.creator.name)
        console.assert(authorUrl === actual.creator.url)
        console.assert(false === actual.isAccessibleForFree)
        console.assert(actual.hasOwnProperty('distribution'))
        console.assert(Array.isArray(actual.distribution))
        console.assert(3 === actual.distribution.length)
        console.assert(distri[0].url === actual.distribution[0].contentUrl)
        console.assert(distri[0].format === actual.distribution[0].encodingFormat)
        console.assert(distri[1].url === actual.distribution[1].contentUrl)
        console.assert('xml' === actual.distribution[1].encodingFormat)
        console.assert(distri[2].url === actual.distribution[2].contentUrl)
        console.assert(distri[2].format === actual.distribution[2].encodingFormat)
    }
}
