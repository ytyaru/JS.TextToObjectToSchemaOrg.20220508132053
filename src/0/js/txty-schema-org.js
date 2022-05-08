class TxtySchemaOrgPersonError extends ExtensibleCustomError {}
class TxtySchemaOrgArticleError extends ExtensibleCustomError {}
class TxtySchemaOrg {
    static Article(txt, indent=null) { return new TxtySchemaOrgArticle().generate(txt, indent) ; }
}
class TxtySchemaOrgGenerator {
    generateContextObj() { return {'@context': 'https://schema.org'}; }
    generateTypeObj(type) { return {'@type': type}; }
    generateContextTypeObj(type) { return {'@context': 'https://schema.org', '@type': type}; }
}
class TxtySchemaOrgPerson extends TxtySchemaOrgGenerator {
    generate(name, url=null) {
        const result = this.generateTypeObj('Person')
        result.name = name
        if (url) { result.url = url; }
        return result
    }
    generateFromTxty(txtyObj) {
        const result = this.generateTypeObj('Person')
        result.name = txtyObj.name
        if (0 < txtyObj.options.length) {
            result.url = txtyObj.options[0];
            if (1 < txtyObj.options.length) {
                result.sameAs = txtyObj.options.slice(1);
            }
        }
        return result
    }
}
class TxtySchemaOrgArticle extends TxtySchemaOrgGenerator {
    generate(txt, indent=null) {
        const block = Txty.lines(txt)[0]
        if (0 === block.length) { throw new TxtySchemaOrgArticleError(`引数txtが空です。有効なテキストを入力してください。`); }
        let result = this.generateContextTypeObj('Article'); // Article, NewsArticle, BlogPosting
        result.headline = block[0].name
        if (0 < block[0].options.length) { result.image = block[0].options; } // 画像URL配列（16x9,4x3,1x1）
        if (1 < block.length) {
            let authorBlock = block[1]
            if (2 < block.length) {
                result = Object.assign(result, this.#setDates(block[1]))
                authorBlock = block[2]
            }
            result.author = new TxtySchemaOrgPerson().generateFromTxty(authorBlock)
        }
        return result
    }
    #setDates(block) {
        if ('-' === block.name) { return {}; }
        const obj = {}
        if (0 == block.options.length) {
            obj.datePublished = block.name
        } else {
            const [dt1, dt2] = [Date.parse(block.name), Date.parse(block.options[0])]
            if (dt1 < dt2) {
                obj.datePublished = block.name
                obj.dateModified = block.options[0]
            } else {
                obj.datePublished = block.options[0]
                obj.dateModified = block.name
            }
        }
        return obj
    }
}
