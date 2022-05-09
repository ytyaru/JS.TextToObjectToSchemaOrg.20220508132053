class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgFaq {
    test() {
        this.#testBlank()
        this.#testStore1Only()
        this.#testStore2()
        this.#testStore2_1()
        this.#testStore3()
        this.#testStore4()
        this.#testStore6()
    }
    #testBlank() {
        try { /*Txty.store('');*/ new TxtySchemaOrgFaq().parse(''); }
        catch (e) {
            if (!(e instanceof TxtyStoreError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数linesは空白文字以外が1字以上ある文字列の要素が1つ以上必要です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStore1Only() {
        const txt = `質問文。`
        try { new TxtySchemaOrgFaq().parse(txt); }
        catch (e) {
            if (!(e instanceof TxtySchemaOrgQuestionError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数storeは2つの要素をもった配列であるべきです。1つ目が質問、2つ目が答えであることを期待します。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStore2() {
        const txt = `
質問文。
回答文。`
        const actual =  new TxtySchemaOrgFaq().parse(txt);
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('FAQPage' === actual['@type'])

        console.assert(actual.hasOwnProperty('mainEntity'))
        console.assert(Array.isArray(actual.mainEntity))
        console.assert(1 === actual.mainEntity.length)

        console.assert(!actual.mainEntity[0].hasOwnProperty('@context'))
        console.assert(actual.mainEntity[0].hasOwnProperty('@type'))
        console.assert('Question' === actual.mainEntity[0]['@type'])
        console.assert(actual.mainEntity[0].hasOwnProperty('name'))
        console.assert('質問文。' === actual.mainEntity[0].name)

        console.assert(actual.mainEntity[0].hasOwnProperty('acceptedAnswer'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('@type'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('text'))
        console.assert('Answer' === actual.mainEntity[0].acceptedAnswer['@type'])
        console.assert('回答文。' === actual.mainEntity[0].acceptedAnswer.text)
    }

    #testStore2_1() {
        const txt = `
質問文。
回答文。

回答文がないのでエラー`
        try { new TxtySchemaOrgFaq().parse(txt); }
        catch (e) {
            if (!(e instanceof TxtySchemaOrgQuestionError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数storeは2つの要素をもった配列であるべきです。1つ目が質問、2つ目が答えであることを期待します。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStore3() {
        const txt = `
質問文。
回答文。
質問と回答のあとに新たな行が続いているとエラー`
        try { new TxtySchemaOrgFaq().parse(txt); }
        catch (e) {
            if (!(e instanceof TxtySchemaOrgQuestionError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数storeは2つの要素をもった配列であるべきです。1つ目が質問、2つ目が答えであることを期待します。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStore4() {
        const txt = `
質問文1。
回答文1。

質問文2。
回答文2。`
        const actual =  new TxtySchemaOrgFaq().parse(txt);
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('FAQPage' === actual['@type'])

        console.assert(actual.hasOwnProperty('mainEntity'))
        console.assert(Array.isArray(actual.mainEntity))
        console.assert(2 === actual.mainEntity.length)

        console.assert(!actual.mainEntity[0].hasOwnProperty('@context'))
        console.assert(actual.mainEntity[0].hasOwnProperty('@type'))
        console.assert('Question' === actual.mainEntity[0]['@type'])
        console.assert(actual.mainEntity[0].hasOwnProperty('name'))
        console.assert('質問文1。' === actual.mainEntity[0].name)

        console.assert(actual.mainEntity[0].hasOwnProperty('acceptedAnswer'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('@type'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('text'))
        console.assert('Answer' === actual.mainEntity[0].acceptedAnswer['@type'])
        console.assert('回答文1。' === actual.mainEntity[0].acceptedAnswer.text)
 
        console.assert(!actual.mainEntity[1].hasOwnProperty('@context'))
        console.assert(actual.mainEntity[1].hasOwnProperty('@type'))
        console.assert('Question' === actual.mainEntity[1]['@type'])
        console.assert(actual.mainEntity[1].hasOwnProperty('name'))
        console.assert('質問文2。' === actual.mainEntity[1].name)

        console.assert(actual.mainEntity[1].hasOwnProperty('acceptedAnswer'))
        console.assert(actual.mainEntity[1].acceptedAnswer.hasOwnProperty('@type'))
        console.assert(actual.mainEntity[1].acceptedAnswer.hasOwnProperty('text'))
        console.assert('Answer' === actual.mainEntity[1].acceptedAnswer['@type'])
        console.assert('回答文2。' === actual.mainEntity[1].acceptedAnswer.text)
    }
    #testStore6() {
        const txt = `

質問文1。
回答文1。

質問文2。
回答文2。

質問文3。
回答文3。


`
        const actual =  new TxtySchemaOrgFaq().parse(txt);
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('FAQPage' === actual['@type'])

        console.assert(actual.hasOwnProperty('mainEntity'))
        console.assert(Array.isArray(actual.mainEntity))
        console.assert(3 === actual.mainEntity.length)

        console.assert(!actual.mainEntity[0].hasOwnProperty('@context'))
        console.assert(actual.mainEntity[0].hasOwnProperty('@type'))
        console.assert('Question' === actual.mainEntity[0]['@type'])
        console.assert(actual.mainEntity[0].hasOwnProperty('name'))
        console.assert('質問文1。' === actual.mainEntity[0].name)

        console.assert(actual.mainEntity[0].hasOwnProperty('acceptedAnswer'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('@type'))
        console.assert(actual.mainEntity[0].acceptedAnswer.hasOwnProperty('text'))
        console.assert('Answer' === actual.mainEntity[0].acceptedAnswer['@type'])
        console.assert('回答文1。' === actual.mainEntity[0].acceptedAnswer.text)
 
        console.assert(!actual.mainEntity[1].hasOwnProperty('@context'))
        console.assert(actual.mainEntity[1].hasOwnProperty('@type'))
        console.assert('Question' === actual.mainEntity[1]['@type'])
        console.assert(actual.mainEntity[1].hasOwnProperty('name'))
        console.assert('質問文2。' === actual.mainEntity[1].name)

        console.assert(actual.mainEntity[1].hasOwnProperty('acceptedAnswer'))
        console.assert(actual.mainEntity[1].acceptedAnswer.hasOwnProperty('@type'))
        console.assert(actual.mainEntity[1].acceptedAnswer.hasOwnProperty('text'))
        console.assert('Answer' === actual.mainEntity[1].acceptedAnswer['@type'])
        console.assert('回答文2。' === actual.mainEntity[1].acceptedAnswer.text)
 
        console.assert(!actual.mainEntity[2].hasOwnProperty('@context'))
        console.assert(actual.mainEntity[2].hasOwnProperty('@type'))
        console.assert('Question' === actual.mainEntity[2]['@type'])
        console.assert(actual.mainEntity[2].hasOwnProperty('name'))
        console.assert('質問文3。' === actual.mainEntity[2].name)

        console.assert(actual.mainEntity[2].hasOwnProperty('acceptedAnswer'))
        console.assert(actual.mainEntity[2].acceptedAnswer.hasOwnProperty('@type'))
        console.assert(actual.mainEntity[2].acceptedAnswer.hasOwnProperty('text'))
        console.assert('Answer' === actual.mainEntity[2].acceptedAnswer['@type'])
        console.assert('回答文3。' === actual.mainEntity[2].acceptedAnswer.text)
   }
}
