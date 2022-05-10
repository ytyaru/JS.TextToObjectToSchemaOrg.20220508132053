class UnitTestError extends ExtensibleCustomError {}
class TestDuration {
    test() {
        this.#testInvalid()
        this.#testFull()
        this.#testFullOverflow()
        this.#testZeroPadding()
        this.#testYmd()
        this.#testHms()
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
    #testInvalid() {
        let actual = parseDuration(``)
        console.assert(null === actual)
        actual = parseDuration(`abcd`)
        console.assert(null === actual)
        actual = parseDuration(`12:34:56`)
        console.assert(null === actual)
        actual = parseDuration(`34:56`)
        console.assert(null === actual)
        actual = parseDuration(`56`)
        console.assert(null === actual)
    }
    #testFull() {
        const actual = parseDuration(`P1Y2M3DT4H5M6S`)
        console.assert(1 === actual.year)
        console.assert(2 === actual.month)
        console.assert(3 === actual.day)
        console.assert(4 === actual.hour)
        console.assert(5 === actual.minute)
        console.assert(6 === actual.second)
    }
    #testFullOverflow() {
        const actual = parseDuration(`P99999Y56M78DT99H88M77S`)
        console.assert(99999 === actual.year)
        console.assert(56 === actual.month)
        console.assert(78 === actual.day)
        console.assert(99 === actual.hour)
        console.assert(88 === actual.minute)
        console.assert(77 === actual.second)
    }
    #testZeroPadding() {
        const actual = parseDuration(`P0001Y002M03DT04H05M06S`)
        console.assert(1 === actual.year)
        console.assert(2 === actual.month)
        console.assert(3 === actual.day)
        console.assert(4 === actual.hour)
        console.assert(5 === actual.minute)
        console.assert(6 === actual.second)
    }
    #testYmd() {
        const actual = parseDuration(`P1Y2M3`)
        console.log(actual)
        console.assert(1 === actual.year)
        console.assert(2 === actual.month)
        console.assert(3 === actual.day)
        console.assert(!actual.hasOwnProperty('hour'))
        console.assert(!actual.hasOwnProperty('minute'))
        console.assert(!actual.hasOwnProperty('second'))
    }
    #testHms() {
        const actual = parseDuration(`PT4H5M6S`)
        console.assert(!actual.hasOwnProperty('hour'))
        console.assert(!actual.hasOwnProperty('minute'))
        console.assert(!actual.hasOwnProperty('second'))
        console.assert(4 === actual.hour)
        console.assert(5 === actual.minute)
        console.assert(6 === actual.second)
    }
}
