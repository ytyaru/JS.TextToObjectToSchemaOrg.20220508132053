class UnitTestError extends ExtensibleCustomError {}
class TestTxtySchemaOrgHowTo {
    test() {
        this.#testText()
        this.#testBlank()
        this.#testBlock1()
        this.#testBlock5()
        this.#testBlock2()
        this.#testHowToStoreFull()
        this.#testHowToStoreLostTotalTime()
        this.#testHowToStoreLostEstimatedCost()
        this.#testHowToStoreLostVideo()
        this.#testHowToStoreLostImageVideo()
        this.#testHowToStoreTotalTime()
        this.#testHowToStoreEstimatedCost()
        this.#testHowToStoreImageVideo()
        this.#testHowToStoreImage()
        this.#testBlock3()
        this.#testBlock3Option()
        this.#testBlock3Supplies()
        this.#testBlock4()
        this.#testBlock4Option()
        this.#testBlock4Tools()
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
    #testHowToStoreFull() {
        const txt = `
HowToの名前
P3DT4H5M6S
1,234.5 EUR
https://image.png    https://video.mp4

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('P3DT4H5M6S' === actual.totalTime)
        console.assert('MonetaryAmount' === actual.estimatedCost['@type'])
        console.assert('EUR' === actual.estimatedCost.currency)
        console.assert(1,234.5 === actual.estimatedCost.value)
        console.assert('https://image.png' === actual.image)
        console.assert('VideoObject' === actual.video['@type'])
        console.assert('HowToの名前' === actual.video.name)
        console.assert('HowToの名前' === actual.video.description)
        console.assert('https://image.png' === actual.video.thumbnailUrl)
        console.assert('https://video.mp4' === actual.video.contentUrl)
        console.assert(!actual.video.hasOwnProperty('embedUrl'))
        console.assert(Date.parse(actual.video.uploadDate))

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testHowToStoreLostTotalTime() {
        const txt = `
HowToの名前
1,234.5 EUR
https://image.png    https://video.mp4

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        
        console.assert(!actual.hasOwnProperty('totalTime'))

        console.assert('HowToの名前' === actual.name)
        console.assert('MonetaryAmount' === actual.estimatedCost['@type'])
        console.assert('EUR' === actual.estimatedCost.currency)
        console.assert(1,234.5 === actual.estimatedCost.value)
        console.assert('https://image.png' === actual.image)
        console.assert('VideoObject' === actual.video['@type'])
        console.assert('HowToの名前' === actual.video.name)
        console.assert('HowToの名前' === actual.video.description)
        console.assert('https://image.png' === actual.video.thumbnailUrl)
        console.assert('https://video.mp4' === actual.video.contentUrl)
        console.assert(!actual.video.hasOwnProperty('embedUrl'))
        console.assert(Date.parse(actual.video.uploadDate))

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)

    }
    #testHowToStoreLostEstimatedCost() {
        const txt = `
HowToの名前
P3DT4H5M6S
https://image.png    https://video.mp4

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(!actual.hasOwnProperty('estimatedCost'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('P3DT4H5M6S' === actual.totalTime)
        console.assert('https://image.png' === actual.image)
        console.assert('VideoObject' === actual.video['@type'])
        console.assert('HowToの名前' === actual.video.name)
        console.assert('HowToの名前' === actual.video.description)
        console.assert('https://image.png' === actual.video.thumbnailUrl)
        console.assert('https://video.mp4' === actual.video.contentUrl)
        console.assert(!actual.video.hasOwnProperty('embedUrl'))
        console.assert(Date.parse(actual.video.uploadDate))

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testHowToStoreLostVideo() {
        const txt = `
HowToの名前
P3DT4H5M6S
1,234.5 EUR
https://image.png

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(!actual.hasOwnProperty('video'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('P3DT4H5M6S' === actual.totalTime)
        console.assert('MonetaryAmount' === actual.estimatedCost['@type'])
        console.assert('EUR' === actual.estimatedCost.currency)
        console.assert(1,234.5 === actual.estimatedCost.value)
        console.assert('https://image.png' === actual.image)

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testHowToStoreLostImageVideo() {
        const txt = `
HowToの名前
P3DT4H5M6S
1,234.5 EUR

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('video'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('P3DT4H5M6S' === actual.totalTime)
        console.assert('MonetaryAmount' === actual.estimatedCost['@type'])
        console.assert('EUR' === actual.estimatedCost.currency)
        console.assert(1,234.5 === actual.estimatedCost.value)

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testHowToStoreTotalTime() {
        const txt = `
HowToの名前
P3DT4H5M6S

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(!actual.hasOwnProperty('estimatedCost'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('video'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('P3DT4H5M6S' === actual.totalTime)

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testHowToStoreEstimatedCost() {
        const txt = `
HowToの名前
1,234.5 EUR

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(!actual.hasOwnProperty('totalTime'))
        console.assert(!actual.hasOwnProperty('image'))
        console.assert(!actual.hasOwnProperty('video'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('MonetaryAmount' === actual.estimatedCost['@type'])
        console.assert('EUR' === actual.estimatedCost.currency)
        console.assert(1,234.5 === actual.estimatedCost.value)

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testHowToStoreImageVideo() {
        const txt = `
HowToの名前
https://image.png    https://video.mp4

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(!actual.hasOwnProperty('totalTime'))
        console.assert(!actual.hasOwnProperty('estimatedCost'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('https://image.png' === actual.image)
        console.assert('VideoObject' === actual.video['@type'])
        console.assert('HowToの名前' === actual.video.name)
        console.assert('HowToの名前' === actual.video.description)
        console.assert('https://image.png' === actual.video.thumbnailUrl)
        console.assert('https://video.mp4' === actual.video.contentUrl)
        console.assert(!actual.video.hasOwnProperty('embedUrl'))
        console.assert(Date.parse(actual.video.uploadDate))

        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testHowToStoreImage() {
        const txt = `
HowToの名前
https://image.png

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(!actual.hasOwnProperty('totalTime'))
        console.assert(!actual.hasOwnProperty('estimatedCost'))
        console.assert(!actual.hasOwnProperty('video'))
        
        console.assert('HowToの名前' === actual.name)
        console.assert('https://image.png' === actual.image)
        console.assert(Array.isArray(actual.step))
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }

    #testBlock3() {
        const txt = `
HowToの名前

素材1

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(actual.hasOwnProperty('supply'))
        console.assert(!actual.hasOwnProperty('tool'))

        console.assert('HowToの名前' === actual.name)
        console.assert(1 === actual.supply.length)
        console.assert('素材1' === actual.supply[0].name)
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testBlock3Option() {
        const txt = `
HowToの名前

素材1    https://supply1.png

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(actual.hasOwnProperty('supply'))
        console.assert(!actual.hasOwnProperty('tool'))

        console.assert('HowToの名前' === actual.name)
        console.assert(1 === actual.supply.length)
        console.assert('素材1' === actual.supply[0].name)
        console.assert('https://supply1.png' === actual.supply[0].image)
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testBlock3Supplies() {
        const txt = `
HowToの名前

素材1    https://supply1.png
素材2
素材3    https://supply3.png

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(actual.hasOwnProperty('supply'))
        console.assert(!actual.hasOwnProperty('tool'))

        console.assert('HowToの名前' === actual.name)
        console.assert(3 === actual.supply.length)
        console.assert('素材1' === actual.supply[0].name)
        console.assert('https://supply1.png' === actual.supply[0].image)
        console.assert('素材2' === actual.supply[1].name)
        console.assert(!actual.supply[1].hasOwnProperty('image'))
        console.assert('素材3' === actual.supply[2].name)
        console.assert('https://supply3.png' === actual.supply[2].image)
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testBlock4() {
        const txt = `
HowToの名前

素材1

道具1

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(actual.hasOwnProperty('supply'))
        console.assert(actual.hasOwnProperty('tool'))

        console.assert('HowToの名前' === actual.name)
        console.assert(1 === actual.supply.length)
        console.assert('素材1' === actual.supply[0].name)
        console.assert(1 === actual.tool.length)
        console.assert('道具1' === actual.tool[0].name)
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testBlock4Option() {
        const txt = `
HowToの名前

素材1

道具1    https://tool1.png

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(actual.hasOwnProperty('supply'))
        console.assert(actual.hasOwnProperty('tool'))

        console.assert('HowToの名前' === actual.name)
        console.assert(1 === actual.supply.length)
        console.assert('素材1' === actual.supply[0].name)
        console.assert(1 === actual.tool.length)
        console.assert('道具1' === actual.tool[0].name)
        console.assert('https://tool1.png' === actual.tool[0].image)
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
    #testBlock4Tools() {
        const txt = `
HowToの名前

素材1

道具1    https://tool1.png
道具2
道具3    https://tool3.png

手順1
`
        const actual = new TxtySchemaOrgHowTo().parseFromComposite(Txty.composite(txt)) 
        console.log(actual)
        console.assert(actual.hasOwnProperty('name'))
        console.assert(actual.hasOwnProperty('step'))
        console.assert(actual.hasOwnProperty('supply'))
        console.assert(actual.hasOwnProperty('tool'))

        console.assert('HowToの名前' === actual.name)
        console.assert(1 === actual.supply.length)
        console.assert('素材1' === actual.supply[0].name)
        console.assert(3 === actual.tool.length)
        console.assert('道具1' === actual.tool[0].name)
        console.assert('https://tool1.png' === actual.tool[0].image)
        console.assert('道具2' === actual.tool[1].name)
        console.assert(!actual.tool[0].hasOwnProperty('image'))
        console.assert('道具3' === actual.tool[2].name)
        console.assert('https://tool3.png' === actual.tool[2].image)
        console.assert(1 === actual.step.length)
        console.assert('手順1' === actual.step[0].text)
    }
}
