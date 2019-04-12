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

module.exports.parse = parse;
module.exports.transpile = transpile;
module.exports.run = run;
module.exports.localizedKeyword = parser.localizedKeyword;
module.exports.localizedIdentifier = parser.localizedIdentifier;
module.exports.translateIdentifier = parser.translateIdentifier;
module.exports.localizationSettings = parser.localizationSettings;
