class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgImageObject {
    test() {
        this.#testBlank()
        this.#testUrlOnly()
        this.#test2Size()
        this.#test2License()
        this.#test3License()
        this.#test3LicenseSize()
        this.#test3SizeLicense()
        this.#test4LicenseSize()
        this.#test4SizeLicense()
        this.#test5()
    }
    #testBlank() {
        try { new TxtySchemaOrgImageObject().parseFromItem(Txty.item(``)); }
        catch (e) {
            console.log(e)
            if (!(e instanceof TxtyItemError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数lineには空白文字以外の字がひとつ以上必要です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testUrlOnly() {
        const txt = `https://image.png`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(!actual.hasOwnProperty('license'))
        console.assert(!actual.hasOwnProperty('acquireLicensePage'))
        console.assert(!actual.hasOwnProperty('width'))
        console.assert(!actual.hasOwnProperty('height'))

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.log(JSON.stringify(actual))
    }
    #test2Size() {
        const txt = `https://image.png    640x480`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(!actual.hasOwnProperty('license'))
        console.assert(!actual.hasOwnProperty('acquireLicensePage'))

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert(actual.hasOwnProperty('width'))
        console.assert(actual.hasOwnProperty('height'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.assert(640 === actual.width)
        console.assert(480 === actual.height)
        console.log(JSON.stringify(actual))
    }
    #test2License() {
        const txt = `https://image.png    https://license.html`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(!actual.hasOwnProperty('acquireLicensePage'))
        console.assert(!actual.hasOwnProperty('width'))
        console.assert(!actual.hasOwnProperty('height'))

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert(actual.hasOwnProperty('license'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.assert('https://license.html' === actual.license)
        console.log(JSON.stringify(actual))
    }
    #test3License() {
        const txt = `https://image.png    https://license.html    https://acquireLicensePage.html`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(!actual.hasOwnProperty('width'))
        console.assert(!actual.hasOwnProperty('height'))

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert(actual.hasOwnProperty('license'))
        console.assert(actual.hasOwnProperty('acquireLicensePage'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.assert('https://license.html' === actual.license)
        console.assert('https://acquireLicensePage.html' === actual.acquireLicensePage)
        console.log(JSON.stringify(actual))
    }
    #test3LicenseSize() {
        const txt = `https://image.png    https://license.html    640x480`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(!actual.hasOwnProperty('acquireLicensePage'))

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert(actual.hasOwnProperty('license'))
        console.assert(actual.hasOwnProperty('width'))
        console.assert(actual.hasOwnProperty('height'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.assert('https://license.html' === actual.license)
        console.assert(640 === actual.width)
        console.assert(480 === actual.height)
        console.log(JSON.stringify(actual))
    }
    #test3SizeLicense() {
        const txt = `https://image.png    640x480    https://license.html`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(!actual.hasOwnProperty('acquireLicensePage'))

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert(actual.hasOwnProperty('license'))
        console.assert(actual.hasOwnProperty('width'))
        console.assert(actual.hasOwnProperty('height'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.assert('https://license.html' === actual.license)
        console.assert(640 === actual.width)
        console.assert(480 === actual.height)
        console.log(JSON.stringify(actual))
    }
    #test4SizeLicense() {
        const txt = `https://image.png    640x480    https://license.html    https://acquireLicensePage.html`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert(actual.hasOwnProperty('license'))
        console.assert(actual.hasOwnProperty('width'))
        console.assert(actual.hasOwnProperty('height'))
        console.assert(actual.hasOwnProperty('acquireLicensePage'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.assert('https://license.html' === actual.license)
        console.assert('https://acquireLicensePage.html' === actual.acquireLicensePage)
        console.assert(640 === actual.width)
        console.assert(480 === actual.height)
        console.log(JSON.stringify(actual))
    }
    #test4LicenseSize() {
        const txt = `https://image.png    https://license.html    https://acquireLicensePage.html    640x480`
        const actual = new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt))
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('ImageObject' === actual['@type'])

        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.assert(actual.hasOwnProperty('license'))
        console.assert(actual.hasOwnProperty('width'))
        console.assert(actual.hasOwnProperty('height'))
        console.assert(actual.hasOwnProperty('acquireLicensePage'))
        console.assert('https://image.png' === actual.url)
        console.assert('https://image.png' === actual.contentUrl)
        console.assert('https://license.html' === actual.license)
        console.assert('https://acquireLicensePage.html' === actual.acquireLicensePage)
        console.assert(640 === actual.width)
        console.assert(480 === actual.height)
        console.log(JSON.stringify(actual))
    }
    #test5() {
        const txt = `https://image.png    https://license.html    https://acquireLicensePage.html    640x480    エラー`
        try { new TxtySchemaOrgImageObject().parseFromItem(Txty.item(txt)); }
        catch (e) {
            console.log(e)
            if (!(e instanceof TxtySchemaOrgImageObjectError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `オプション数は1〜3であるべきです。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
}
