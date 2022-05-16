class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgRating {
    test() {
        this.#testBlank()
        this.#testInvalidValue()
        this.#testInvalidMin()
        this.#testInvalidMax()
        this.#testTooSmallValue()
        this.#testTooBigValue()
        this.#testInt()
        /*
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
        */
    }
    #testBlank() {
        const txt = ``
        const errorType = TxtySchemaOrgRatingError
        const message = `引数textを指定してください。`
        try {
            const actual = new TxtySchemaOrgRating().parse(txt)
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testInvalidValue() {
        const txt = `不正値`
        const errorType = TxtySchemaOrgRatingError
        const message = `引数textは整数、実数、分数、パーセンテージ、いずれかの形式であるべきです。たとえば  4  4.2  6/10  64%  など。: ${txt}`
        try {
            const actual = new TxtySchemaOrgRating().parse(txt)
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }

    }
    #testInvalidMin() {
        const min = -1
        const max = 5
        const txt = `5`
        const errorType = TxtySchemaOrgRatingError
        const message = `最小値は0以上であるべきです。: ${min}`
        try {
            const actual = new TxtySchemaOrgRating(min, max).parse(txt)
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testInvalidMax() {
        const min = 1
        const max = -1
        const txt = `5`
        const errorType = TxtySchemaOrgRatingError
        const message = `最大値は0以上であるべきです。: ${max}`
        try {
            const actual = new TxtySchemaOrgRating(min, max).parse(txt)
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testTooSmallValue() {
        const min = 1
        const max = 5
        const txt = `0`
        const errorType = TxtySchemaOrgRatingError
        const message = `値は最小値以上であるべきです。値:${txt}, 最小値:${min}`
        try {
            const actual = new TxtySchemaOrgRating(min, max).parse(txt)
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testTooBigValue() {
        const min = 1
        const max = 5
        const txt = `6`
        const errorType = TxtySchemaOrgRatingError
        const message = `値は最大値以下であるべきです。値:${txt}, 最大値:${max}`
        try {
            const actual = new TxtySchemaOrgRating(min, max).parse(txt)
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            console.log(e)
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testInt() {
        const min = 1
        const max = 5
        const value = 3
        const rating = new TxtySchemaOrgRating(min, max)
        const actual = rating.parse(value)
        console.assert(value === rating.Value)
        console.log(rating.Text, `${value}`)
        console.assert(`${value}` === rating.Text)
        console.assert('Rating' === actual['@type'])
        console.assert(max === actual.bestRating)
        console.assert(min === actual.worstRating)
        console.assert(value === actual.ratingValue)
    }
}
