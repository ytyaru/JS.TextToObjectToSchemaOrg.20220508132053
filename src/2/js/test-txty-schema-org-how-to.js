class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgHowTo {
    test() {
        this.#testText()
        this.#testBlank()
        this.#testBlock1()
        this.#testBlock5()
        this.#testBlock2()
    }
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
    #testText() {
        this.#testError(``, TxtySchemaOrgHowToError, `引数compoは配列であるべきです。Txty.composite()の戻り値を期待します。`)
    }
    #testBlank() {
        this.#testError(Txty.composite(``), TxtySchemaOrgHowToError, `引数compoは配列であり、その要素数は2,3,4のいずれかであるべきです。`)
    }
    #testBlock1() {
        this.#testError(Txty.composite(`HowToの名前`), TxtySchemaOrgHowToError, `引数compoは配列であり、その要素数は2,3,4のいずれかであるべきです。`)
    }
    #testBlock5() {
        const txt = `
HowToの名前

素材

道具

手順1

エラー
`
        this.#testError(Txty.composite(txt), TxtySchemaOrgHowToError, `引数compoは配列であり、その要素数は2,3,4のいずれかであるべきです。`)
    }
    #testBlock2() {
        const txt = `
HowToの名前

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
}
