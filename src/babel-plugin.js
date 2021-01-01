import {Parser} from "./state"
import escodegen from "escodegen";

const transpile = (code) => {
  const ast = Parser.parse(code);
  return escodegen.generate(ast);
}

export const ChavascriptBabelPlugin = (babel) => ({
  parserOverride:  (code, opts) => babel.parse(transpile(code), opts)
});