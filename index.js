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

const translateVariables = parser.translateVariables;
const localizeWord = parser.localizeWord;
const localizedKeyword = parser.localizedKeyword;
const localizedOperator = parser.localizedOperator;

module.exports = {
    parse,
    transpile,
    run,
    translateVariables,
    localizeWord,
    localizedKeyword,
    localizedOperator
};
