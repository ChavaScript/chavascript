import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import * as chavascript from "chavascript";

window.chavascript = chavascript;
window.buildEditor = buildEditor;
hljs.registerLanguage("javascript", javascript);
document.addEventListener("DOMContentLoaded", function () {
    buildEditors();
    buildDocumentation();
});

const documentationClassifiers = {
    "variables": "הצהרת משתנים",
    "function": "יכולת",
    "boolean": "קבועי הגיון",
    "if": "ביטויי אם",
    "loops": "לולאות",
    "switch": "החלפת מקרה",
    "try": "טיפול בשגיאות",
    "oop": "תכנות מונחה עצמים",
    "other": "אחרים",
    "safety": "בטיחות סוג והידור",
    "types": "סוגים",
    "generic": "כלליים",
    "functions": "יכולות פומביות",
    "classes": "מחלקות פומביות",
    "array": "שיטות מערך",
    "string": "שיטות מחרוזת",
    "promise": "שיטות הבטחה",
    "math": "שיטות חשבון",
    "console": "שיטות בקרה",
    "json": "שיטות פנחס",
};

const documentationComments = {
    "JSON": "(JavaScript Object Notation)",
    "פנחס": "(פענוח נתונים חווה סקריפט)",
};

function buildEditor(element, code, onExecute) {
    element.innerHTML = `
    <div class="editor"></div>
    <div style="text-align: left; margin: 10px 0;">
        <button class="execute">הרץ (Ctrl + Enter)</button>
    </div>
    <div>
        <div class="output-console" style="width: 50%; float: right; padding-left: 5px;">
            תוצאת ההרצה
            <div class="result"></div>
        </div>
        <div class="output-error" style="display: none; width: 50%; float: right; padding-left: 5px;">
            <div class="transpile-error">
                לא מצליח להחלף את הקוד
            </div>
            <div class="runtime-error">
                לא מצליח להריץ את הקוד
            </div>
            <div class="error-details"></div>
        </div>
        <div class="output-js" style="width: 50%; float: left; padding-right: 5px;">
            קוד ה- JavaScript המהוחלף
            <div class="highlight js-highlight">
                <pre><code class="javascript js-result"></code></pre>
            </div>
        </div>
        <div style="clear: both;"></div>
    </div>`;
    const editorElement = element.getElementsByClassName("editor").item(0);
    const result = element.getElementsByClassName("result").item(0);
    const executeButton = element.getElementsByClassName("execute").item(0);
    const jsResult = element.getElementsByClassName("js-result").item(0);
    const errorDetails = element.getElementsByClassName("error-details").item(0);
    const outputJs = element.getElementsByClassName("output-js").item(0);
    const outputError = element.getElementsByClassName("output-error").item(0);
    const outputConsole = element.getElementsByClassName("output-console").item(0);
    const transpileError = element.getElementsByClassName("transpile-error").item(0);
    const runtimeError = element.getElementsByClassName("runtime-error").item(0);
    const langTools = ace.require("ace/ext/language_tools");
    const editor = ace.edit(editorElement);
    editor.setTheme("ace/theme/darkula");
    editor.session.setMode("ace/mode/chavascript");
    editor.setShowPrintMargin(false);
    editor.setOptions({enableBasicAutocompletion: true, enableLiveAutocompletion: true});
    editor.session.$bidiHandler.setRtlDirection(editor, true);
    editor.session.$bidiHandler.$isRtl = true;
    editor.setOption("rtlText", false);
    editor.renderer.on("afterRender", updateLineDirection);
    editor.session.$bidiHandler.seenBidi = true;
    editor.renderer.updateFull();
    editor.setValue(code);
    editor.selection.moveTo(Infinity, Infinity);

    const {navigateLeft, navigateRight} = editor;
    editor.navigateLeft = navigateRight;
    editor.navigateRight = navigateLeft;

    const {moveCursorShortWordLeft, moveCursorShortWordRight} = editor.selection;
    editor.selection.moveCursorShortWordLeft = moveCursorShortWordRight;
    editor.selection.moveCursorShortWordRight = moveCursorShortWordLeft;

    const {moveCursorLongWordLeft, moveCursorLongWordRight} = editor.selection;
    editor.selection.moveCursorLongWordLeft = moveCursorLongWordRight;
    editor.selection.moveCursorLongWordRight = moveCursorLongWordLeft;

    const {moveCursorLineStart, moveCursorLineEnd} = editor.selection;
    editor.selection.moveCursorLineStart = moveCursorLineEnd;
    editor.selection.moveCursorLineEnd = moveCursorLineStart;

    const {selectLeft, selectRight} = editor.selection;
    editor.selection.selectLeft = selectRight;
    editor.selection.selectRight = selectLeft;

    const {remove} = editor;
    editor.remove = function (dir) {
        remove.apply(editor, [dir === "left" ? "right" : "left"]);
    };

    editor.commands.addCommand({
        name: "execute",
        bindKey: {win: "Ctrl-Enter", mac: "Command-Enter"},
        exec: execute
    });

    const keywords = extractObjectValues(chavascript.localizationSettings.default.keywords);
    const publicSymbols = extractObjectValues(chavascript.localizationSettings.default.dictionary);
    const keywordResults = keywords.map(value => ({name: value, value, score: 1, meta: "מילת מפתח"}));
    const symbolResults = publicSymbols.map(value => ({name: value, value, score: 1, meta: "משתנה פומבי"}));
    const completions = keywordResults.concat(symbolResults);
    const chavascriptCompleter = {
        getCompletions: function (editor, session, pos, prefix, callback) {
            callback(null, completions);
        }
    };

    const keywordObject = {};
    const identifierRegex = /^[$A-Zא-ת_][0-9א-תA-Z_$]*$/i;
    for (const keyword of keywords) {
        keywordObject[keyword] = true;
    }
    const localCompleter = {
        getCompletions: function (editor, session, pos, prefix, callback) {
            langTools.textCompleter.getCompletions(editor, session, pos, prefix, function (e, results) {
                if (e) {
                    return callback(e);
                }
                const completions = results
                    .filter(result => !keywordObject[result.value])         // filter keywords
                    .filter(result => identifierRegex.test(result.value))   // filter non identifiers
                    .map(result => {
                        result.meta = "מקומי";
                        return result;
                    });
                callback(null, completions);
            });
        }
    };

    editor.completers = [localCompleter, chavascriptCompleter];

    function execute() {
        const input = editor.getValue();
        onExecute && onExecute(input);
        const transpileResult = tryTranspile(input);
        if (transpileResult.e) {
            errorDetails.innerText = transpileResult.e.toString();
            transpileError.style.display = "block";
            runtimeError.style.display = "none";
            outputJs.style.display = "none";
            outputConsole.style.display = "none";
            outputError.style.display = "block";
            return;
        }
        jsResult.innerText = transpileResult.jsCode;
        hljs.highlightBlock(jsResult);
        outputJs.style.display = "block";
        const evalResult = tryEvalAndCaptureOutput(transpileResult.jsCode);
        if (evalResult.e) {
            errorDetails.innerText = evalResult.e.toString();
            transpileError.style.display = "none";
            runtimeError.style.display = "block";
            outputConsole.style.display = "none";
            outputError.style.display = "block";
            return;
        }
        result.innerHTML = evalResult.output;
        outputConsole.style.display = "block";
        outputError.style.display = "none";
    }

    function tryTranspile(input) {
        try {
            const jsCode = chavascript.transpile(input);
            return {e: undefined, jsCode};
        } catch (e) {
            return {jsCode: undefined, e};
        }
    }

    function tryEvalAndCaptureOutput(code) {
        try {
            const {log, warn, error, debug, trace} = console;
            let lines = [];
            console.log = function () {
                lines.push(`<span class="console-log">${Array.from(arguments).join(", ")}</span>`);
            };
            console.warn = function () {
                lines.push(`<span class="console-warn">${Array.from(arguments).join(", ")}</span>`);
            };
            console.error = function () {
                lines.push(`<span class="console-error">${Array.from(arguments).join(", ")}</span>`);
            };
            console.debug = function () {
                lines.push(`<span class="console-debug">${Array.from(arguments).join(", ")}</span>`);
            };
            console.trace = function () {
                lines.push(`<span class="console-trace">${Array.from(arguments).join(", ")}</span>`);
            };
            eval(code);
            console.log = log;
            console.warn = warn;
            console.error = error;
            console.debug = debug;
            console.trace = trace;
            const output = lines.join("<br>");
            return {e: undefined, output};
        } catch (e) {
            return {e, output: undefined};
        }
    }

    executeButton.onclick = execute;
    execute();
    return editor;
}

function updateLineDirection(e, renderer) {
    const session = renderer.session;
    const $bidiHandler = session.$bidiHandler;
    const cells = renderer.$textLayer.$lines.cells;
    const width = renderer.layerConfig.width - renderer.layerConfig.padding + "px";
    cells.forEach(function (cell) {
        const style = cell.element.style;
        if ($bidiHandler && $bidiHandler.isRtlLine(cell.row)) {
            style.direction = "rtl";
            style.textAlign = "right";
            style.width = width;
        } else {
            style.direction = "";
            style.textAlign = "";
            style.width = "";
        }
    });
}

function extractObjectValues(obj) {
    const result = [];
    for (const key in obj) {
        result.push(obj[key])
    }
    return result;
}

function buildEditors() {
    const elements = document.getElementsByClassName("chs-editor");
    for (const element of elements) {
        buildEditor(element, element.innerHTML);
    }
}

function buildDocumentation() {
    const keywordTable = document.getElementById("keyword-list");
    populateTable(keywordTable, chavascript.localizationSettings.default.classifiedKeywords, "hljs-keyword");
    const varTable = document.getElementById("variable-list");
    populateTable(varTable, chavascript.localizationSettings.default.classifiedDictionary, "hljs-built_in");
}

function populateTable(table, dictionary, className) {
    if (!table) {
        return;
    }
    const body = table.getElementsByTagName("tbody").item(0);
    if (!body) {
        return;
    }
    for (const categoryName in dictionary) {
        const category = dictionary[categoryName];
        const title = documentationClassifiers[categoryName] || categoryName;
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="doc-title" colspan="2">${title}</td>`;
        body.appendChild(tr);
        for (const eng in category) {
            const heb = category[eng];
            const engComments = typeof documentationComments[eng] === "string" ? documentationComments[eng] : "";
            const hebComments = typeof documentationComments[heb] === "string" ? documentationComments[heb] : "";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><code class="chs-code ${className}">${heb}</code><span class="doc-comment">${hebComments}</span></td>
                <td style="direction: ltr;"><code class="js-code ${className}">${eng}</code><span class="doc-comment">${engComments}</span></td>
            `;
            body.appendChild(tr);
        }
    }
}

if (localStorage) {
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            if (!localStorage.getItem("reloaded")) {
                localStorage.setItem("reloaded", "1");
                location.reload();
            } else {
                localStorage.removeItem("reloaded");
            }
        }, 0);
    });
}
