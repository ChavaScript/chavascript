import buble from "rollup-plugin-buble"

export default {
  entry: "src/index.js",
  moduleName: "chavascript-parser",
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ],
  sourceMap: true,
  targets: [
    {dest: "dist/chavascript-parser.js", format: "umd"},
    {dest: "dist/chavascript-parser.mjs", format: "es"}
  ]
}
