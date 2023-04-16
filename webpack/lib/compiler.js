const {parse,transformFromAst,traverse} = require('@babel/core')
const path = require('path')
const fs = require('fs')
const Parser = {
    getAst(ph){
        const content = fs.readFileSync(ph,'utf-8')
        return parse(content,{
            sourceType: 'module'
        })
    },
    getDependeyies(ast,filePath){
        const dependeyies = {}
        traverse(ast,{
            ImportDeclaration({node}){
                const absolutePath = node.source.value
                const completePath = './'+path.join(path.dirname(filePath),absolutePath)
                dependeyies[absolutePath] = completePath
            }
        })
        return dependeyies
    },
    getCode(ast){
        const { code } = transformFromAst(ast,null,{
            presets: ['@babel/preset-env']
        })
        return code
    }
}
class Compiler{
    constructor(options){
        this.entry = options.entry
        this.output = options.output
        this.module = []
    }
    run(){
        const info = this.build(this.entry)
        this.module.push(info)
        for(let i = 0; i <  this.module.length; i++) {
            const { dependeyies } = this.module[i]
            if(dependeyies) {
                for(let dependey in dependeyies) {
                    this.module.push(this.build(dependeyies[dependey]))
                }
            }
        }
        const dependeyies = this.module.reduce((pre,cur)=>{
            return{
                ...pre,
                [cur.filename] : {
                    code: cur.code,
                    dependeyies: cur.dependeyies
                }
            }
        },{})
        this.generator(dependeyies)
    }
    build(ph){
        const ast = Parser.getAst(ph)
        const dependeyies = Parser.getDependeyies(ast,ph)
        const code = Parser.getCode(ast)
        return {
            filename:ph,
            code,
            dependeyies
        }
    }
    generator(chunk){
        const finallyPath = path.join(this.output.path,this.output.filename)
        const bundle = `
        (function(graph){
            function require(moduleId){
                var exports = {}
                function absRequire(relative){
                    return require(graph[moduleId].dependeyies[relative])
                }
                (function(require,exports,code){
                    eval(code)
                })(absRequire,exports,graph[moduleId].code)
                return exports
            }
            require('${this.entry}')
        })(${JSON.stringify(chunk)})
    `
        !fs.existsSync(this.output.path) && fs.mkdirSync(this.output.path)
        fs.writeFileSync(finallyPath,bundle)
    }
}
exports.Compiler = Compiler