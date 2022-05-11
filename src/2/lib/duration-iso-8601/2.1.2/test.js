class UnitTestError extends ExtensibleCustomError {}
class TestDuration {
    test() {
        this.#testBlank()
        this.#testInvalid1()
        this.#testInvalid2()
        this.#testInvalid3()
        this.#testInvalid4()
        this.#testFull()
        this.#testFullOverflow()
        this.#testZeroPadding()
        this.#testYmd()
        this.#testHms()
        this.#testYmdMiss()
        this.#testHmsMiss()
    }
    #testError(input, errorType, message) {
        try {
            let actual = new Duration().parse(input)
            throw new UnitTestError(`例外が発生すべきところで発生しませんでした。`)
        }
        catch (e) {
            if (!(e instanceof errorType)) { throw new UnitTestError(`例外の型が期待値と違います。${typeof e}`);  }
            if (e.message !== message) { throw new UnitTestError(`例外メッセージが期待値と違います。`);  }
        }

    }
    #testBlank() { this.#testError(``, RangeError, `invalid duration: `); }
    #testInvalid1() {
        const input = `abcd`
        this.#testError(input, RangeError, `invalid duration: ${input}`)
    }
    #testInvalid2() {
        const input = `12:34:56`
        this.#testError(input, RangeError, `invalid duration: ${input}`)
    }
    #testInvalid3() {
        const input = `34:56`
        this.#testError(input, RangeError, `invalid duration: ${input}`)
    }
    #testInvalid4() {
        const input = `56`
        this.#testError(input, RangeError, `invalid duration: ${input}`)
    }
    #testFull() {
        const actual = new Duration().parse(`P1Y2M3DT4H5M6S`)
        if (null === actual) { throw new UnitTestError(`期待値と違います。${typeof e}`); }
        console.assert(1 === actual.years)
        console.assert(2 === actual.months)
        console.assert(3 === actual.days)
        console.assert(4 === actual.hours)
        console.assert(5 === actual.minutes)
        console.assert(6 === actual.seconds)
        console.assert(0 === actual.weeks)
        console.log(actual)
    }
    #testFullOverflow() {
        const actual = new Duration().parse(`P99999Y56M78DT99H88M77S`)
        if (null === actual) { throw new UnitTestError(`期待値と違います。${typeof e}`); }
        console.assert(99999 === actual.years)
        console.assert(56 === actual.months)
        console.assert(78 === actual.days)
        console.assert(99 === actual.hours)
        console.assert(88 === actual.minutes)
        console.assert(77 === actual.seconds)
        console.assert(0 === actual.weeks)
    }
    #testZeroPadding() {
        const actual = new Duration().parse(`P0001Y002M03DT04H05M06S`)
        if (null === actual) { throw new UnitTestError(`期待値と違います。${typeof e}`); }
        console.assert(1 === actual.years)
        console.assert(2 === actual.months)
        console.assert(3 === actual.days)
        console.assert(4 === actual.hours)
        console.assert(5 === actual.minutes)
        console.assert(6 === actual.seconds)
        console.assert(0 === actual.weeks)
    }
    #testYmd() {
        const actual = new Duration().parse(`P1Y2M3D`)
        if (null === actual) { throw new UnitTestError(`期待値と違います。${typeof e}`); }
        console.log(actual)
        console.assert(1 === actual.years)
        console.assert(2 === actual.months)
        console.assert(3 === actual.days)
        console.assert(0 === actual.hours)
        console.assert(0 === actual.minutes)
        console.assert(0 === actual.seconds)
        console.assert(0 === actual.weeks)
    }
    #testYmdMiss() {
        const actual = new Duration().parse(`P1Y2M3`) // 末尾のDがないとき、どうなるか。それ以前までを正常取得する
        if (null === actual) { throw new UnitTestError(`期待値と違います。${typeof e}`); }
        console.log(actual)
        console.assert(1 === actual.years)
        console.assert(2 === actual.months)
        console.assert(0 === actual.days)
        //console.assert(3 === actual.days) // 取得されない
        console.assert(0 === actual.hours)
        console.assert(0 === actual.minutes)
        console.assert(0 === actual.seconds)
        console.assert(0 === actual.weeks)
    }
    #testHms() {
        const actual = new Duration().parse(`PT4H5M6S`)
        if (null === actual) { throw new UnitTestError(`期待値と違います。${typeof e}`); }
        console.assert(0 === actual.years)
        console.assert(0 === actual.months)
        console.assert(0 === actual.days)
        console.assert(4 === actual.hours)
        console.assert(5 === actual.minutes)
        console.assert(6 === actual.seconds)
        console.assert(0 === actual.weeks)
    }
    #testHmsMiss() {
        const actual = new Duration().parse(`PT4H5M6`) // 末尾のSがない
        if (null === actual) { throw new UnitTestError(`期待値と違います。${typeof e}`); }
        console.assert(0 === actual.years)
        console.assert(0 === actual.months)
        console.assert(0 === actual.days)
        console.assert(4 === actual.hours)
        console.assert(5 === actual.minutes)
        console.assert(0 === actual.seconds)
        //console.assert(6 === actual.seconds) // 取得されない
        console.assert(0 === actual.weeks)
    }
}
