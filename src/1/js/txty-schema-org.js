class TxtySchemaOrgPersonError extends ExtensibleCustomError {}
class TxtySchemaOrgArticleError extends ExtensibleCustomError {}
class TxtySchemaOrgQuestionError extends ExtensibleCustomError {}
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
    }
}
