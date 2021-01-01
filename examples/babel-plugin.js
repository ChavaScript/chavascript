const {ChavascriptBabelPlugin} = require('../dist/chavascript-parser');
const babel = require('@babel/core');

const inputCode = `
יכולת אחד() {
   יהי א = 12;
   בקרה.תעד(א);
}
`;

const output = babel.transformSync(inputCode, {
  plugins: [ChavascriptBabelPlugin]
});

console.log(output.code);