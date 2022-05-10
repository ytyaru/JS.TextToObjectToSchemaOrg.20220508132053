class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgImageObject {
    test() {
        this.#testBlank()
        this.#testUrlOnly()
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
        console.assert(actual.hasOwnProperty('url'))
        console.assert(actual.hasOwnProperty('contentUrl'))
        console.log(JSON.stringify(actual))
    }
}
