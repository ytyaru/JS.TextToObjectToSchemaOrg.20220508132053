class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgPracticeProblem {
    test() {
        this.#testBlank()
        this.#testStoresLack()
        this.#testStoresLackAnswer0()
        this.#testStoresLackAnswer1()
        this.#testStoresOverAnswer7()
        this.#testInvalidAnswerAcceptChar()
        this.#testMinimum()
        this.#testMaxAnswser6()
        this.#testQuestion3()
        this.#testMinimumComment()
        this.#testQuestion3Comment()
    }
    #testBlank() {
        const errorType = TxtyStoreError
        const message = `引数linesは空白文字以外が1字以上ある文字列の要素が1つ以上必要です。`
        try {
            const txt = ``
            const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStoresLack() {
        const errorType = TxtySchemaOrgPracticeProblemError
        const message = `引数storesは2つ以上の要素をもった配列であるべきです。1つ目が名前、2つ目以降が問題とその回答であることを期待します。問題と回答は1つ目が問題文、2つ目以降が回答文です。回答文は「{成否}{問題文}    {コメント}」の書式です。成否と問題文は必須で、コメントは任意です。成否は「○⭕」「☓❌」「☑☐」で指定してください。`
        try {
            const txt = `練習問題名`
            const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStoresLackAnswer0() {
        const errorType = TxtySchemaOrgPracticeProblemError
        const message = `1つの質問あたり回答は2〜6個であるべきです。`
        try {
            const txt = `練習問題名

質問文1`
            console.log(txt)
            console.log(Txty.stores(txt))
            const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStoresLackAnswer1() {
        const errorType = TxtySchemaOrgPracticeProblemError
        const message = `1つの質問あたり回答は2〜6個であるべきです。`
        try {
            const txt = `練習問題名

質問文1
○回答文1`
            console.log(txt)
            console.log(Txty.stores(txt))
            const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testStoresOverAnswer7() {
        const errorType = TxtySchemaOrgPracticeProblemError
        const message = `1つの質問あたり回答は2〜6個であるべきです。`
        try {
            const txt = `練習問題名

質問文1
○回答文1
❌回答文2
❌回答文3
❌回答文4
❌回答文5
❌回答文6
❌エラー。回答文は2〜6個まで。
`
            console.log(txt)
            console.log(Txty.stores(txt))
            const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }


    #testInvalidAnswerAcceptChar() {
        const errorType = TxtySchemaOrgPracticeProblemError
        const message = `回答itemは最初の文字が「⭕」「○」「☑」「❌」「☓」「☐」のいずれかであるべきです。前者3つが正解、後者3つが間違いを表します。`
        try {
            const txt = `練習問題名

質問文1
回答文1
回答文2
`
            console.log(txt)
            console.log(Txty.stores(txt))
            const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testMinimum() {
        const txt = `練習問題名

質問文1
⭕回答文1
❌回答文2
`
        console.log(txt)
        const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Quiz' === actual['@type'])
        console.assert('Practice problem' === actual.learningResourceType)
        console.assert('Thing' === actual.about['@type'])
        console.assert('練習問題名' === actual.about.name)

        console.assert(Array.isArray(actual.hasPart))
        console.assert(1 === actual.hasPart.length)
        console.assert('Question' === actual.hasPart[0]['@type'])
        console.assert('質問文1' === actual.hasPart[0].text)
        console.assert('Multiple choice' === actual.hasPart[0].eduQuestionType)

        console.assert(Array.isArray(actual.hasPart[0].acceptedAnswer))
        console.assert(1 === actual.hasPart[0].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].acceptedAnswer[0]['@type'])
        console.assert('回答文1' === actual.hasPart[0].acceptedAnswer[0].text)
        console.assert(!actual.hasPart[0].acceptedAnswer[0].hasOwnProperty('comment'))

        console.assert(Array.isArray(actual.hasPart[0].suggestedAnswer))
        console.assert(1 === actual.hasPart[0].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].suggestedAnswer[0]['@type'])
        console.assert('回答文2' === actual.hasPart[0].suggestedAnswer[0].text)
        console.assert(!actual.hasPart[0].suggestedAnswer[0].hasOwnProperty('comment'))
    }
    #testMaxAnswser6() {
        const txt = `練習問題名

質問文1
⭕回答文1
❌回答文2
❌回答文3
❌回答文4
❌回答文5
❌回答文6
`
        console.log(txt)
        const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
        console.log(actual)
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Quiz' === actual['@type'])
        console.assert('Practice problem' === actual.learningResourceType)
        console.assert('Thing' === actual.about['@type'])
        console.assert('練習問題名' === actual.about.name)
        console.assert(Array.isArray(actual.hasPart))
        console.assert(1 === actual.hasPart.length)
        console.assert('Question' === actual.hasPart[0]['@type'])
        console.assert('質問文1' === actual.hasPart[0].text)
        console.assert('Multiple choice' === actual.hasPart[0].eduQuestionType)

        console.assert(Array.isArray(actual.hasPart[0].acceptedAnswer))
        console.assert(1 === actual.hasPart[0].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].acceptedAnswer[0]['@type'])
        console.assert('回答文1' === actual.hasPart[0].acceptedAnswer[0].text)
        console.assert(!actual.hasPart[0].acceptedAnswer[0].hasOwnProperty('comment'))

        console.assert(Array.isArray(actual.hasPart[0].suggestedAnswer))
        console.assert(5 === actual.hasPart[0].suggestedAnswer.length)
        for (let i=0; i<actual.hasPart[0].suggestedAnswer.length; i++) {
            console.assert('Answer' === actual.hasPart[0].suggestedAnswer[i]['@type'])
            console.assert(`回答文${i+2}` === actual.hasPart[0].suggestedAnswer[i].text)
            console.assert(!actual.hasPart[0].suggestedAnswer[i].hasOwnProperty('comment'))
        }
    }
    #testQuestion3() {
        const txt = `練習問題名

質問文1
⭕回答文1-1
❌回答文1-2

質問文2
❌回答文2-1
⭕回答文2-2

質問文3
❌回答文3-1
⭕回答文3-2
❌回答文3-3
⭕回答文3-4
`
        console.log(txt)
        const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
        console.log(actual)
        console.log(JSON.stringify(actual))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Quiz' === actual['@type'])
        console.assert('Practice problem' === actual.learningResourceType)
        console.assert('Thing' === actual.about['@type'])
        console.assert('練習問題名' === actual.about.name)
        console.assert(Array.isArray(actual.hasPart))
        console.assert(3 === actual.hasPart.length)
        for (let i=0; i<actual.hasPart.length; i++) {
            console.assert('Question' === actual.hasPart[i]['@type'])
            console.assert(`質問文${i+1}` === actual.hasPart[i].text)
        }
        console.assert('Multiple choice' === actual.hasPart[0].eduQuestionType)
        console.assert('Multiple choice' === actual.hasPart[1].eduQuestionType)
        console.assert('Checkbox' === actual.hasPart[2].eduQuestionType)

        console.assert(Array.isArray(actual.hasPart[0].acceptedAnswer))
        console.assert(1 === actual.hasPart[0].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].acceptedAnswer[0]['@type'])
        console.assert('回答文1-1' === actual.hasPart[0].acceptedAnswer[0].text)
        console.assert(!actual.hasPart[0].acceptedAnswer[0].hasOwnProperty('comment'))

        console.assert(Array.isArray(actual.hasPart[0].suggestedAnswer))
        console.assert(1 === actual.hasPart[0].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].suggestedAnswer[0]['@type'])
        console.assert(`回答文1-2` === actual.hasPart[0].suggestedAnswer[0].text)
        console.assert(!actual.hasPart[0].suggestedAnswer[0].hasOwnProperty('comment'))

        console.assert(Array.isArray(actual.hasPart[1].acceptedAnswer))
        console.assert(1 === actual.hasPart[1].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[1].acceptedAnswer[0]['@type'])
        console.assert('回答文2-2' === actual.hasPart[1].acceptedAnswer[0].text)
        console.assert(!actual.hasPart[1].acceptedAnswer[0].hasOwnProperty('comment'))

        console.assert(Array.isArray(actual.hasPart[1].suggestedAnswer))
        console.assert(1 === actual.hasPart[1].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[1].suggestedAnswer[0]['@type'])
        console.assert(`回答文2-1` === actual.hasPart[1].suggestedAnswer[0].text)
        console.assert(!actual.hasPart[1].suggestedAnswer[0].hasOwnProperty('comment'))

        console.assert(Array.isArray(actual.hasPart[2].acceptedAnswer))
        console.assert(2 === actual.hasPart[2].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[2].acceptedAnswer[0]['@type'])
        console.assert('回答文3-2' === actual.hasPart[2].acceptedAnswer[0].text)
        console.assert(!actual.hasPart[2].acceptedAnswer[0].hasOwnProperty('comment'))
        console.assert('Answer' === actual.hasPart[2].acceptedAnswer[1]['@type'])
        console.assert('回答文3-4' === actual.hasPart[2].acceptedAnswer[1].text)
        console.assert(!actual.hasPart[2].acceptedAnswer[1].hasOwnProperty('comment'))

        console.assert(Array.isArray(actual.hasPart[2].suggestedAnswer))
        console.assert(2 === actual.hasPart[2].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[2].suggestedAnswer[0]['@type'])
        console.assert(`回答文3-1` === actual.hasPart[2].suggestedAnswer[0].text)
        console.assert(!actual.hasPart[2].suggestedAnswer[0].hasOwnProperty('comment'))
        console.assert(`回答文3-3` === actual.hasPart[2].suggestedAnswer[1].text)
        console.assert(!actual.hasPart[2].suggestedAnswer[1].hasOwnProperty('comment'))
    }
    #testMinimumComment() {
        const txt = `練習問題名

質問文1
⭕回答文1    これが正解である理由。
❌回答文2    これが間違いである理由。
`
        console.log(txt)
        const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
        console.log(actual)
        console.log(JSON.stringify(actual))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Quiz' === actual['@type'])
        console.assert('Practice problem' === actual.learningResourceType)
        console.assert('Thing' === actual.about['@type'])
        console.assert('練習問題名' === actual.about.name)

        console.assert(Array.isArray(actual.hasPart))
        console.assert(1 === actual.hasPart.length)
        console.assert('Question' === actual.hasPart[0]['@type'])
        console.assert('質問文1' === actual.hasPart[0].text)
        console.assert('Multiple choice' === actual.hasPart[0].eduQuestionType)

        console.assert(Array.isArray(actual.hasPart[0].acceptedAnswer))
        console.assert(1 === actual.hasPart[0].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].acceptedAnswer[0]['@type'])
        console.assert('回答文1' === actual.hasPart[0].acceptedAnswer[0].text)
//        console.assert(!actual.hasPart[0].acceptedAnswer[0].hasOwnProperty('comment'))
        console.assert('Comment' === actual.hasPart[0].acceptedAnswer[0].comment['@type'])
        console.assert('これが正解である理由。' === actual.hasPart[0].acceptedAnswer[0].comment.text)

        console.assert(Array.isArray(actual.hasPart[0].suggestedAnswer))
        console.assert(1 === actual.hasPart[0].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].suggestedAnswer[0]['@type'])
        console.assert('回答文2' === actual.hasPart[0].suggestedAnswer[0].text)
//        console.assert(!actual.hasPart[0].suggestedAnswer[0].hasOwnProperty('comment'))
        console.assert('Comment' === actual.hasPart[0].suggestedAnswer[0].comment['@type'])
        console.assert('これが間違いである理由。' === actual.hasPart[0].suggestedAnswer[0].comment.text)
    }
    #testQuestion3Comment() {
        const txt = `練習問題名

質問文1
⭕回答文1-1    1-1が正解である理由
❌回答文1-2    1-2が間違いである理由

質問文2
❌回答文2-1    2-1が間違いである理由
⭕回答文2-2    2-2が正解である理由

質問文3
❌回答文3-1    3-1が間違いである理由
⭕回答文3-2    3-2が正解である理由
❌回答文3-3    3-3が間違いである理由
⭕回答文3-4    3-4が正解である理由
`
        console.log(txt)
        const actual = new TxtySchemaOrgPracticeProblem().parseFromStores(Txty.stores(txt))
        console.log(actual)
        console.log(JSON.stringify(actual))
        console.assert('https://schema.org' === actual['@context'])
        console.assert('Quiz' === actual['@type'])
        console.assert('Practice problem' === actual.learningResourceType)
        console.assert('Thing' === actual.about['@type'])
        console.assert('練習問題名' === actual.about.name)
        console.assert(Array.isArray(actual.hasPart))
        console.assert(3 === actual.hasPart.length)
        for (let i=0; i<actual.hasPart.length; i++) {
            console.assert('Question' === actual.hasPart[i]['@type'])
            console.assert(`質問文${i+1}` === actual.hasPart[i].text)
        }
        console.assert('Multiple choice' === actual.hasPart[0].eduQuestionType)
        console.assert('Multiple choice' === actual.hasPart[1].eduQuestionType)
        console.assert('Checkbox' === actual.hasPart[2].eduQuestionType)

        console.assert(Array.isArray(actual.hasPart[0].acceptedAnswer))
        console.assert(1 === actual.hasPart[0].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].acceptedAnswer[0]['@type'])
        console.assert('回答文1-1' === actual.hasPart[0].acceptedAnswer[0].text)
        console.assert('Comment' === actual.hasPart[0].acceptedAnswer[0].comment['@type'])
        console.assert('1-1が正解である理由' === actual.hasPart[0].acceptedAnswer[0].comment.text)

        console.assert(Array.isArray(actual.hasPart[0].suggestedAnswer))
        console.assert(1 === actual.hasPart[0].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[0].suggestedAnswer[0]['@type'])
        console.assert(`回答文1-2` === actual.hasPart[0].suggestedAnswer[0].text)
        console.assert('Comment' === actual.hasPart[0].suggestedAnswer[0].comment['@type'])
        console.assert('1-2が間違いである理由' === actual.hasPart[0].suggestedAnswer[0].comment.text)

        console.assert(Array.isArray(actual.hasPart[1].acceptedAnswer))
        console.assert(1 === actual.hasPart[1].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[1].acceptedAnswer[0]['@type'])
        console.assert('回答文2-2' === actual.hasPart[1].acceptedAnswer[0].text)
        console.assert('Comment' === actual.hasPart[1].acceptedAnswer[0].comment['@type'])
        console.assert('2-2が正解である理由' === actual.hasPart[1].acceptedAnswer[0].comment.text)

        console.assert(Array.isArray(actual.hasPart[1].suggestedAnswer))
        console.assert(1 === actual.hasPart[1].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[1].suggestedAnswer[0]['@type'])
        console.assert(`回答文2-1` === actual.hasPart[1].suggestedAnswer[0].text)
        console.assert('Comment' === actual.hasPart[1].suggestedAnswer[0].comment['@type'])
        console.assert('2-1が間違いである理由' === actual.hasPart[1].suggestedAnswer[0].comment.text)

        console.assert(Array.isArray(actual.hasPart[2].acceptedAnswer))
        console.assert(2 === actual.hasPart[2].acceptedAnswer.length)
        console.assert('Answer' === actual.hasPart[2].acceptedAnswer[0]['@type'])
        console.assert('回答文3-2' === actual.hasPart[2].acceptedAnswer[0].text)
        console.assert('Comment' === actual.hasPart[2].acceptedAnswer[0].comment['@type'])
        console.assert('3-2が正解である理由' === actual.hasPart[2].acceptedAnswer[0].comment.text)
        console.assert('Answer' === actual.hasPart[2].acceptedAnswer[1]['@type'])
        console.assert('回答文3-4' === actual.hasPart[2].acceptedAnswer[1].text)
        console.assert('Comment' === actual.hasPart[2].acceptedAnswer[1].comment['@type'])
        console.assert('3-4が正解である理由' === actual.hasPart[2].acceptedAnswer[1].comment.text)

        console.assert(Array.isArray(actual.hasPart[2].suggestedAnswer))
        console.assert(2 === actual.hasPart[2].suggestedAnswer.length)
        console.assert('Answer' === actual.hasPart[2].suggestedAnswer[0]['@type'])
        console.assert(`回答文3-1` === actual.hasPart[2].suggestedAnswer[0].text)
        console.assert('Comment' === actual.hasPart[2].suggestedAnswer[0].comment['@type'])
        console.assert('3-1が間違いである理由' === actual.hasPart[2].suggestedAnswer[0].comment.text)
        console.assert(`回答文3-3` === actual.hasPart[2].suggestedAnswer[1].text)
        console.assert('Comment' === actual.hasPart[2].suggestedAnswer[1].comment['@type'])
        console.assert('3-3が間違いである理由' === actual.hasPart[2].suggestedAnswer[1].comment.text)
    }
}
