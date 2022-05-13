class TxtySchemaOrgPersonError extends ExtensibleCustomError {}
class TxtySchemaOrgArticleError extends ExtensibleCustomError {}
class TxtySchemaOrgQuestionError extends ExtensibleCustomError {}
class TxtySchemaOrgMonetaryAmountError extends ExtensibleCustomError {}
class TxtySchemaOrgImageObjectError extends ExtensibleCustomError {}
class TxtySchemaOrgHowToError extends ExtensibleCustomError {}
class TxtySchemaOrgDatasetError extends ExtensibleCustomError {}
class TxtySchemaOrg {
    static Article(txt, indent=null) { return new TxtySchemaOrgArticle().parse(txt, indent) ; }
}
class TxtySchemaOrgParser {
    generateContextObj() { return {'@context': 'https://schema.org'}; }
    generateTypeObj(type) { return {'@type': type}; }
    generateContextTypeObj(type) { return {'@context': 'https://schema.org', '@type': type}; }
}
class TxtySchemaOrgPerson extends TxtySchemaOrgParser {
    parse(name, url=null) {
        const result = this.generateTypeObj('Person')
        result.name = name
        if (url) { result.url = url; }
        return result
    }
    parseFromItem(item) { // store:Txty.store()の返値
        const result = this.generateTypeObj('Person')
        result.name = item.name
        if (0 < item.options.length) {
            result.url = item.options[0];
            if (1 < item.options.length) {
                result.sameAs = item.options.slice(1);
            }
        }
        return result
    }
}
class TxtySchemaOrgArticle extends TxtySchemaOrgParser {
    parse(txt, indent=null) {
        const store = Txty.store(txt, indent=null)
        let result = this.generateContextTypeObj('Article'); // Article, NewsArticle, BlogPosting
        result.headline = store[0].name
        if (0 < store[0].options.length) { result.image = store[0].options; } // 画像URL配列（16x9,4x3,1x1）
        if (2 === store.length) {
            if (isNaN(Date.parse(store[1].name))) { result.author = new TxtySchemaOrgPerson().parseFromItem(store[1]); }
            else { result = Object.assign(result, this.#setDates(store[1])); }
            
        } else if (3 === store.length){
            result = Object.assign(result, this.#setDates(store[1]))
            result.author = new TxtySchemaOrgPerson().parseFromItem(store[2])
        }
        return result
    }
    #setDates(item) {
        const obj = {}
        if (0 == item.options.length) {
            obj.datePublished = item.name
        } else {
            const [dt1, dt2] = [Date.parse(item.name), Date.parse(item.options[0])]
            if (dt1 < dt2) {
                obj.datePublished = item.name
                obj.dateModified = item.options[0]
            } else {
                obj.datePublished = item.options[0]
                obj.dateModified = item.name
            }
        }
        return obj
    }
}
class TxtySchemaOrgBreadcrumbList extends TxtySchemaOrgParser {
    parse(txt, indent=null) {
        const store = Txty.store(txt, indent)
        const parser = new TxtySchemaOrgListItem()
        const result = this.generateContextTypeObj('BreadcrumbList')
        result.itemListElement = store.map((item, i)=>parser.parseFromItem(item, i+1))
        return result
    }
}
class TxtySchemaOrgListItem extends TxtySchemaOrgParser {
    parseFromItem(item, position=null) {
        let result = this.generateTypeObj('ListItem')
        result.name = item.name
        result.item = (0 < item.options.length) ? item.options[0] : ''
        if (position) { result.position = position }
        return result
    }
}
class TxtySchemaOrgFaq extends TxtySchemaOrgParser {
    parse(txt, indent=null) {
        return this.parseFromStores(Txty.stores(txt, indent=null))
    }
    parseFromStores(stores) {
        const result = this.generateContextTypeObj('FAQPage')
        const parser = new TxtySchemaOrgQuestion()
        result.mainEntity = stores.map(store=>parser.parseFromStore(store))
        return result
    }
}
class TxtySchemaOrgQuestion extends TxtySchemaOrgParser {
    parseFromStore(store) {
        if (2 !== store.length) { throw new TxtySchemaOrgQuestionError(`引数storeは2つの要素をもった配列であるべきです。1つ目が質問、2つ目が答えであることを期待します。`); }
        const question = this.generateTypeObj('Question')
        question.name = store[0].name 
        question.acceptedAnswer = this.generateTypeObj('Answer')
        question.acceptedAnswer.text = store[1].name
        return question
    }
}
class TxtySchemaOrgMonetaryAmount extends TxtySchemaOrgParser {
    // 123
    // 123JPY
    // 123 JPY
    // 1,000 JPY
    // 123.4 EUR
    // 123.4 USD
    parse(text, currency='JPY') {
        const [value, cur] = this.isValid(text, currency)
        if (!value) { throw new TxtySchemaOrgMonetaryAmountError(`引数textは数値か、または数値化できるテキストであるべきです。もし通貨単位も同時に指定するなら末尾にJPY,EUR,USDなどを指定できます。`); }
        return this.#generate(value, cur)
    }
    isValid(text, currency='JPY') {
        let value = Number(text.replace(',', ''))
        if (!value) {
            currency = text.trim().slice(-3)
            value = Number(text.trim().slice(0, -3).replace(',', ''))
            if (!value) { return false }
        }
        return this.#generate(value, currency)
    }
    #generate(value, currency) { return {
        '@type': 'MonetaryAmount',
        currency: currency,
        value: value,
    }}
}
class TxtySchemaOrgImageObject extends TxtySchemaOrgParser {
    parseFromItem(item) {
        const image = this.generateTypeObj('ImageObject')
        image.url = item.name
        image.contentUrl = item.name
        if (item.options.length < 1) { return image; }
        let size = this.#isSize(item.options[0])
        switch (item.options.length) {
            case 1:
                if (size) { image.width = size[0]; image.height = size[1]; }
                else { image.license = item.options[0]; }
                break
            case 2:
                if (size) { image.width = size[0]; image.height = size[1]; image.license = item.options[1]; }
                else {
                    let size = this.#isSize(item.options[1])
                    image.license = item.options[0]
                    if (size) { image.width = size[0]; image.height = size[1]; }
                    else { image.acquireLicensePage = item.options[1];  }
                }
                break
            case 3:
                if (size) { image.width = size[0]; image.height = size[1]; image.license = item.options[1]; image.acquireLicensePage = item.options[2]; }
                else {
                    image.license = item.options[0]
                    image.acquireLicensePage = item.options[1]
                    size = this.#isSize(item.options[2])
                    if (!size) { throw new TxtySchemaOrgImageObjectError(`オプションが3つあり最初がサイズでないなら、最後はサイズであるべきです。サイズは640x480のように幅x高さの書式で指定してください。`); }
                    image.width = size[0]
                    image.height = size[1]
                }
                break
            default: throw new TxtySchemaOrgImageObjectError(`オプション数は1〜3であるべきです。`)
        }
        return image
    }
    #isSize(str) { // {width}x{height}
        const sizes = []
        const values = str.split('x')
        if (2 !== values.length) { return false; }
        for (const value of values) {
            const size = parseInt(value)
            if (isNaN(size)) { return false; }
            sizes.push(size)
        }
        return sizes
    }
    parseFromStore(store) {
        const image = this.generateTypeObj('ImageObject')
        image.url = store[0].name
        image.contentUrl = store[0].name
        if (2 === store.length) {
            if (isNaN(store[1].name)) { // 幅x高さ
                if (1 !== store[1].options.length) { throw new TxtySchemaOrgImageObjectError(`幅と高さの2数値が必要です。インデントで区切って指定してください。`); }
                if (isNaN(store[1].options[0])) { throw new TxtySchemaOrgImageObjectError(`幅と高さの2数値が必要です。インデントで区切って指定してください。`); }
            } else { // license
                image.license = store[1].name
            }
        }
        return image
    }
}
class TxtySchemaOrgVideoObject extends TxtySchemaOrgParser {
    parse(url, name, description, thumbnailUrl, uploadDate=null) { 
        const video = this.generateTypeObj('VideoObject')
        if (['mp4', 'avi', 'mov', 'wmv', 'mpg', 'mkv', 'flv', 'asf', 'vob'].some(ext=>url.endsWith('.'+ext))) {
            video.contentUrl = url
        } else {
            video.embedUrl = url
        }
        video.name = name
        video.description = description
        video.thumbnailUrl = thumbnailUrl
        video.uploadDate = (uploadDate) ? uploadDate : new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().split('Z')[0] + '+09:00'
        return video
    }
}
class TxtySchemaOrgClip extends TxtySchemaOrgParser {
    parse(name, url, startOffset, endOffset=null) { 
        const clip = this.generateTypeObj('Clip')
        clip.name = name
        clip.url = url
        clip.startOffset = startOffset
        if (endOffset) {clip.endOffset = endOffset} 
        return clip
    }
}
class TxtySchemaOrgHowTo extends TxtySchemaOrgParser {
    parseFromComposite(compo) {
        console.log(compo)
        if (!Array.isArray(compo)) { throw new TxtySchemaOrgHowToError(`引数compoは配列であるべきです。Txty.composite()の戻り値を期待します。`); }
        if (compo.length < 2 || 4 < compo.length) { throw new TxtySchemaOrgHowToError(`引数compoは配列であり、その要素数は2,3,4のいずれかであるべきです。`); }
        return {...this.generateContextTypeObj('HowTo'), ...this.#parseHowToFromStore(compo[0]), ...this.#parseOptions(compo)}
    }
    #parseOptions(compo) {
        const options = {}
        if (3 <= compo.length) { options.supply = this.#parseHowToSuppliesFromStore(compo[1]) }
        if (4 <= compo.length) { options.tool = this.#parseHowToToolsFromStore(compo[2]) }
        options.step = (Array.isArray(compo[compo.length-1])) ? 
                        this.#parseHowToStepsFromStore(compo[compo.length-1]) : 
                        this.#parseHowToStepsFromTree(compo[compo.length-1]);
        return options
    }
    #parseHowToFromStore(store) {
        const obj = {}
        obj.name = store[0].name
        let value = null
        for (const item of store) {
            try {
                value = new Duration().parse(item.name)
                if (value) {obj.totalTime = item.name}
            }
            catch (e) {
                value = new TxtySchemaOrgMonetaryAmount().isValid(item.name)
                if (value) {obj.estimatedCost = value}
                if (['http://', 'https://'].some(protocol=>item.name.startsWith(protocol))) {
                    console.log(item.name)
                    obj.image = item.name
                    if (0 < item.options.length) {
                        obj.video = new TxtySchemaOrgVideoObject().parse(item.options[0], obj.name, obj.name, obj.image);
                    }
                }
            }
        }
        return obj
    }
    #parseHowToItemsFromStore(store, type) {
        const supplies = []
        for (const item of store) {
            const supply = this.generateTypeObj(type)
            supply.name = item.name
            if (0 < item.options.length) { supply.image = item.options[0] }
            supplies.push(supply)
        }
        return supplies 
    }
    #parseHowToSuppliesFromStore(store) { return this.#parseHowToItemsFromStore(store, 'HowToSupply') }
    #parseHowToToolsFromStore(store) { return this.#parseHowToItemsFromStore(store, 'HowToTool') }
    #parseHowToStepTextFromItem(item) {
        const step = super.generateTypeObj('HowToStep')
        step.text = item.name
        if (0 < item.options.length) { step.image = item.options[0] }
        if (1 < item.options.length) {
            if (item.options.length < 3) { throw new TxtySchemaOrgHowToError(`引数itemのoptionで2個目があるとき、3,4個目が必要です。: ${item.options.length}`); }
            let startOffets = Number(item.options[2])
            step.video = new TxtySchemaOrgClip().parse(item.name, item.options[1], )
        }
        return step
    }
    #parseHowToStepsFromStore(store) { return store.map(item=>this.#parseHowToStepTextFromItem(item)) } // 1層
    #parseHowToStepsFromTree(tree) { // 2,3層
        const steps = []
        for (const node of tree.nodes) {
            const maxDepth = this.#calcDepth(node)
            console.log(maxDepth)
            if (1 === maxDepth) { steps.push(this.#parseHowToStepTextFromItem(node.content)) }
            else if (2 === maxDepth) { steps.push(this.#parseHowToStepHasListFromNode(node)) }
            else if (3 === maxDepth) { steps.push(this.#parseHowToSectionFromNode(node)) }
            else { throw new TxtySchemaOrgHowToError(`引数treeの深さは1,2,3のいずれかであるべきです。: ${maxDepth}`); }
        }
        return steps
    }
    #calcDepth(node, depth=1) { // 兄弟の中で最も深い階層数を返す
        if (0 === node.nodes.length) { return depth }
        depth++
        for (const child of node.nodes) {
            const childDepth = this.#calcDepth(child, depth)
            if (depth < childDepth) {depth  = childDepth}
        }
        return depth
    }
    #parseHowToSectionFromNode(node) {
        return {
            ...this.generateTypeObj('HowToSection'), 
            name: node.content.name, 
            itemListElement: node.nodes.map(child=>this.#parseHowToStepHasListFromNode(child)),
        }
    }
    // 不使用
    //#parseHowToStepNameTextFromItem(node) { return {...super.generateTypeObj('HowToStep'), name: node.content.name, text: ""}; }
    #parseHowToStepHasListFromNode(node) {
        const step = {...this.generateTypeObj('HowToStep'), name: node.content.name, itemListElement: []}
        if (0 < node.content.options.length) { step.image = node.content.options[0] }
        if (1 < node.content.options.length) {
            if (node.content.options.length < 3) { throw new TxtySchemaOrgHowToError(`引数itemのoptionで2個目があるとき、3個目が必要です。3個目は 開始..終了 の書式で整数値をセットしてください。: ${node.content.options.length}`); }
            let [startOffsets, endOffsets] = node.content.options[2].split('..').map(v=>Number(v))
            if (!startOffsets || !endOffsets) { throw new TxtySchemaOrgHowToError(`引数itemのoption[2]は 開始..終了 の書式で整数値をセットしてください。: ${node.content.options[2]}`);}
            step.video = new TxtySchemaOrgClip().parse(node.content.name, node.content.options[1], startOffsets, endOffsets)
        }
        for (const child of node.nodes) {
            const direction = (child.content.name.toUpperCase().startsWith('TIP:')) ? 
                                this.#parseHowToTipFromItem(child.content) : 
                                this.#parseHowToDirectionFromItem(child.content);
            step.itemListElement.push(direction)
        }
        return step
    }
    #parseHowToDirectionFromItem(item) { return {...this.generateTypeObj('HowToDirection'), text: item.name} }
    #parseHowToTipFromItem(item) { return {...this.generateTypeObj('HowToTip'), text: item.name.trim().slice('TIP:'.length)} }
}
class TxtySchemaOrgDataDownload extends TxtySchemaOrgParser {
    parse(url, format=null) { 
        const obj = this.generateTypeObj('DataDownload')
        obj.contentUrl = url
        if (format) {obj.encodingFormat = format}
        else {
            const ext = this.#getFormatFromUrl(url)
            if (ext) { obj.encodingFormat = strs[-1] }
        }
        return obj
    }
    parseFromItem(item) {
        const obj = this.generateTypeObj('DataDownload')
        obj.contentUrl = item.name
        if (0 < item.options.length) {
            obj.encodingFormat = item.options[0]
        } else { // URLのファイル名から拡張子を取得し、それを書式名にセットする
            const ext = this.#getFormatFromUrl(item.name)
            if (ext) { obj.encodingFormat = strs[-1] }
        }
        return obj
    }
    #getFormatFromUrl(url) {
        const filename = new URL(url).pathname.split('/')[-1]
        const strs = filename.split('.')
        if (1 < strs.length) { return strs[-1] }
        return ''
    }
}
class TxtySchemaOrgDataset extends TxtySchemaOrgParser {
    parseFromItem(item) {
        if (item.options.length < 2) {throw new TxtySchemaOrgDatasetError(`引数itemは1つ以上のoptions要素をもった配列であるべきです。1つ目が「データセット説明」、2つ目以降が「ダウンロードURL」であることを期待します。`);}
        const obj = this.generateTypeObj('DataDownload')
        obj.name = item.name
        obj.description = item.options[0].name
        if (2 < item.options.length) {
            obj.distribution = []
            const parser = new TxtySchemaOrgDataDownload().parse 
            item.options.slice(2).map(url=>parser(url))
        }
        return obj
    }
    parseFromStore(store) {
        if (store.length < 2) {throw new TxtySchemaOrgDatasetError(`引数storeは2つ以上の要素をもった配列であるべきです。1つ目が「データセット名    URL    License    creator.name    creator.url    isNotFree」、2つ目が「データセット説明」、3つ目以降が「URL    書式」であることを期待します。`);}
        const obj = this.generateTypeObj('DataDownload')
        obj.name = store[0].name
        obj.description = store[1].name
        obj.isAccessibleForFree = true
        if (0 < store[0].options.length) { obj.url = store[0].options[0] }
        if (1 < store[0].options.length) { obj.license = store[0].options[1] }
        if (2 < store[0].options.length) {
            const person = (3 < store[0].options.length) ? 
                            new TxtySchemaOrgPerson().parse(options[2], options[3]) : 
                            new TxtySchemaOrgPerson().parse(options[2])
            obj.creator = person
        }
        if (4 < store[0].options.length) { obj.isAccessibleForFree = false}
        if (2 < store.length) {
            const parser = new TxtySchemaOrgDataDownload().parseFromItem
            obj.distribution = store.slice(2).map(item=>parser(item))
        }
        return obj
    }
}
