class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgMonetaryAmount {
    test() {
        this.#testBlank()
        this.#testValueOnly()
        this.#testValueCurrency()
    }
    #testBlank() {
        try {
            new TxtySchemaOrgMonetaryAmount().parse()
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            if (!(e instanceof TxtySchemaOrgMonetaryAmountError)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== `引数valueは必須です。`) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }
    }
    #testValueOnly() {
        const value = 123
        const actual = new TxtySchemaOrgMonetaryAmount().parse(value)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('MonetaryAmount' === actual['@type'])

        console.assert(actual.hasOwnProperty('value'))
        console.assert(actual.hasOwnProperty('currency'))
        console.assert(value === actual.value)
        console.assert('JPY' === actual.currency)
        console.log(JSON.stringify(actual))
    }
    #testValueCurrency() {
        const value = 123
        const currency = 'USD'
        const actual = new TxtySchemaOrgMonetaryAmount().parse(value, currency)
        console.log(actual)
        console.assert('object' === typeof actual)
        console.assert(!actual.hasOwnProperty('@context'))
        console.assert(actual.hasOwnProperty('@type'))
        console.assert('MonetaryAmount' === actual['@type'])

        console.assert(actual.hasOwnProperty('value'))
        console.assert(actual.hasOwnProperty('currency'))
        console.assert(value === actual.value)
        console.assert(currency === actual.currency)
        console.log(JSON.stringify(actual))
    }
}
