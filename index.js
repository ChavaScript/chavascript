const parser = require("./dist/chavascript-parser");
const escodegen = require("escodegen");

function parse(input, options) {
    return parser.parse(input, options);
}

function transpile(input, options) {
    const ast = parse(input, options);
    return escodegen.generate(ast);
}

function run(input, options) {
    const generated = transpile(input, options);
    eval(generated);
}

const localizedKeyword = parser.localizedKeyword;
const localizedOperator = parser.localizedOperator;
const localizeWord = parser.localizeWord;

module.exports = {
    parse,
    transpile,
    run,
    localizedKeyword,
    localizedOperator,
    localizeWord
};
