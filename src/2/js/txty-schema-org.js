class TxtySchemaOrgPersonError extends ExtensibleCustomError {}
class TxtySchemaOrgArticleError extends ExtensibleCustomError {}
class TxtySchemaOrgQuestionError extends ExtensibleCustomError {}
class TxtySchemaOrgMonetaryAmountError extends ExtensibleCustomError {}
class TxtySchemaOrgImageObjectError extends ExtensibleCustomError {}
class TxtySchemaOrgHowToError extends ExtensibleCustomError {}
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
    parse(value, currency='JPY') {
        if (!value) { throw new TxtySchemaOrgMonetaryAmountError(`引数valueは必須です。`); }
        return {...this.generateTypeObj('MonetaryAmount'), value:value, currency:currency}
    }
    //parse(value, currency='JPY') { return {...this.generateTypeObj('MonetaryAmount'), value:value, currency:currency}; }
    /*
    parse(value, currency='JPY') {
        const obj = this.generateTypeObj('MonetaryAmount')
        obj.value = value
        obj.currency = currency
        return obj
    }
    */
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
        //const [w, h] = str.split('x')
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
    #parseHowToStepTextFromItem(item) { return {...super.generateTypeObj('HowToStep'), text: item.name}; }
    #parseHowToFromStore(store) {
        console.log(store)
        //if (store.length < 1)
        const obj = {}
        obj.name = store[0].name
        if (2 === store.length) {

        }
        console.log(obj)
        return obj
    }
    #parseHowToSuppliesFromStore(store) {
        const supplies = []
        return supplies 
    }
    #parseHowToToolsFromStore(store) {
        const tools = []
        return tools
    }
    //#parseHowToStepsFromStore(store) { return {step: store.map(item=>this.#parseHowToStepTextFromItem(item))} } // 1層
    #parseHowToStepsFromStore(store) { return store.map(item=>this.#parseHowToStepTextFromItem(item)) } // 1層
    #parseHowToStepsFromTree(tree) { // 2,3層
        const steps = []
        for (const node of tree.nodes) {
            const maxDepth = this.#calcDepth(node)
            if (1 === maxDepth) { steps.push(this.#parseHowToStepTextFromItem(node.content)) }
            else if (2 === maxDepth) { steps.push(this.#parseHowToStepHasListFromNode(node)) }
            else if (3 === maxDepth) { steps.push(this.#parseHowToSectionFromNode(node)) }
            else { throw new TxtySchemaOrgHowToError(`引数treeの深さは1,2,3のいずれかであるべきです。`); }
        }
        return steps
        /*
        if (2 === tree.maxDepth) { return tree.nodes.map(node=>this.#parseHowToStepHasListFromNode(node)); }
        else if (3 === tree.maxDepth) { return tree.nodes.map(node=>this.#parseHowToSectionFromNode(node)); }
        else { throw new TxtySchemaOrgHowToError(`引数treeのmaxDepthは2または3であるべきです。`); }
        */
        /*
        const depth = this.#calcDepth(tree)
        console.log(depth)
        if (2 === depth) { return tree.nodes.map(node=>this.#parseHowToStepHasListFromNode(node)); }
        else if (3 === depth) { return tree.nodes.map(node=>this.#parseHowToSectionFromNode(node)); }
        else { throw new TxtySchemaOrgHowToError(`引数treeのmaxDepthは2または3であるべきです。`); }
        */
    }
    #calcDepth(node, depth=1) {
        for (const child of node.nodes) {
            if (0 < child.nodes.length) { depth = this.#calcDepth(child, ++depth); }
        }
        return depth
    }
    /*
    #parseHowToStepsFromTree(tree) { // 2,3層
        const obj = {step: []}
        if (2 === tree.maxDepth) {
            obj.step = tree.nodes.map(node=>this.#parseHowToStepHasListFromNode(node))
        } else if (3 === tree.maxDepth) { obj.step = tree.nodes.map(node=>this.#parseHowToSectionFromNode(node)); }

        else { throw new TxtySchemaOrgHowToError(`引数treeのmaxDepthは2または3であるべきです。`); }
        return obj
    }
    */
    #parseHowToSectionFromItem(item) { return {...this.generateTypeObj('HowToSection'), name: item.name, itemListElement: []} }
    #parseHowToSectionFromNode(node) {
        return {
            ...this.generateTypeObj('HowToSection'), 
            name: item.name, 
            itemListElement: this.#parseHowToStepHasListFromNode(node),
        }
    }
    #parseHowToStepNameTextFromItem(item) { return {...super.generateTypeObj('HowToStep'), name: item.name, text: ""}; } // 不使用
    #parseHowToStepHasListFromItem(item) { return {...super.generateTypeObj('HowToStep'), name: item.name, itemListElement: []}; }
    #parseHowToStepHasListFromNode(node) {
        const step = {...this.generateTypeObj('HowToStep'), name: item.name, itemListElement: []}
        for (const child of node.nodes) {
            const direction = (child.content.name.toUpperCase().startsWith('TIP:')) ? 
                                this.#parseHowToTipFromItem(child.content) : 
                                this.#parseHowToDirectionFromItem(child.content);
            step.itemListElement.push(direction)
        }
        return step
    }
    #parseHowToDirectionFromItem(item) { return {...this.generateTypeObj('HowToDirection'), text: item.name} }
    #parseHowToTipFromItem(item) { return {...this.generateTypeObj('HowToTip'), text: item.name} }
    #parseHowToStepImage(options) {

    }
    #parseHowToStepVideo(options) {

    }




}

