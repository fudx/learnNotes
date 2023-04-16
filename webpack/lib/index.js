const webpackParams = require('../webpack.config.js')
const Compiler = require('./compiler.js').Compiler
new Compiler(webpackParams).run()
