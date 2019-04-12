import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import * as chavascript from "chavascript";

window.chavascript = chavascript;
window.buildEditor = buildEditor;
hljs.registerLanguage("javascript", javascript);
document.addEventListener("DOMContentLoaded", function() {
    const elements = document.getElementsByClassName("chs-editor");
    for (const element of elements) {
        buildEditor(element, element.innerHTML);
    }
});

function buildEditor(element, code) {
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
    const editor = ace.edit(editorElement);
    editor.setTheme("ace/theme/darkula");
    editor.session.setMode("ace/mode/chavascript");
    editor.setShowPrintMargin(false);
    editor.session.$bidiHandler.setRtlDirection(editor, true);
    editor.session.$bidiHandler.$isRtl = true;
    editor.setOption("rtlText", false);
    editor.renderer.on("afterRender", updateLineDirection);
    editor.session.$bidiHandler.seenBidi = true;
    editor.renderer.updateFull();
    editor.setValue(code);
    editor.selection.moveTo(Infinity, Infinity);

    function execute() {
        const input = editor.getValue();
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
        result.innerText = evalResult.output;
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
            const original = console.log;
            let lines = [];
            console.log = function() {
                lines.push(Array.from(arguments).join(", "));
            };
            eval(code);
            console.log = original;
            const output = lines.join("\n");
            return {e: undefined, output};
        } catch (e) {
            return {e, output: undefined};
        }
    }

    executeButton.onclick = execute;
    execute();
}

function updateLineDirection(e, renderer) {
    const session = renderer.session;
    const $bidiHandler = session.$bidiHandler;
    const cells = renderer.$textLayer.$lines.cells;
    const width = renderer.layerConfig.width - renderer.layerConfig.padding + "px";
    cells.forEach(function(cell) {
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