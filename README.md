# ChavaScript

The ChavaScript language transpiler

https://chavascript.github.io/chavascript

# Installation

```bash
npm install chavascript
```

# Usage

The `chavascript` library exposes 3 functions:

- `parse(input, options)` - which parses a given ChavaScript input string, with optional options according to acorn options object.
- `transpile(input, options)` - which translates the given ChavaScript input string to JavaScript string, with optional options according to acorn options object.
- `run(input, options)` - which executes the given ChavaScript input string, with optional options according to acorn options object.

Examples:

```javascript
const chavascript = require("chavascript")

const code = `
יכולת אחד() {
   יהי א = 12;
   בקרה.תעד(א);
}
`;
const ast = chavascript.parse(code);
console.log(JSON.stringify(ast, null, "  "));
```

will produce an abstract syntax tree of the given input:
```
{
  "type": "Program",
  "start": 0,
  "end": 50,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 1,
      "end": 49,
      "id": {
        "type": "Identifier",
        "start": 7,
        "end": 10,
        "name": "ahd"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [],
      "body": {
        "type": "BlockStatement",
        "start": 13,
        "end": 49,
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 18,
            "end": 29,
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 22,
                "end": 28,
                "id": {
                  "type": "Identifier",
                  "start": 22,
                  "end": 23,
                  "name": "a"
                },
                "init": {
                  "type": "Literal",
                  "start": 26,
                  "end": 28,
                  "value": 12,
                  "raw": "12"
                }
              }
            ],
            "kind": "let"
          },
          {
            "type": "ExpressionStatement",
            "start": 32,
            "end": 47,
            "expression": {
              "type": "CallExpression",
              "start": 32,
              "end": 46,
              "callee": {
                "type": "MemberExpression",
                "start": 32,
                "end": 43,
                "object": {
                  "type": "Identifier",
                  "start": 32,
                  "end": 39,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 40,
                  "end": 43,
                  "name": "log"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 44,
                  "end": 45,
                  "name": "a"
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "sourceType": "script"
}
```

```javascript
const chavascript = require("chavascript")

const code = `
יכולת אחד() {
   יהי א = 12;
   בקרה.תעד(א);
}
`;
const generated = chavascript.transpile(code);
console.log(generated);

```

will produce and following output:

```
function ahd() {
    let a = 12;
    console.log(a);
}
```

and

```javascript
const chavascript = require("chavascript")

const code = `
יכולת אחד() {
   יהי א = 12;
   בקרה.תעד(א);
}
אחד();
`;
chavascript.run(code);
```

will produce and following output:

```
12
```
