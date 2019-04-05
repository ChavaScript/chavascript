import {transpile} from "chavascript";
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import hljsChavascript from "./hljs-chavascript";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("chavascript", hljsChavascript);

const textarea = document.getElementsByClassName("editor").item(0);
const textareaHighlight = document.getElementById("editor-highlight");
const chsResult = document.getElementById("chs-code");
const result = document.getElementsByClassName("result").item(0);
const executeButton = document.getElementById("execute");
const jsResult = document.getElementById("js-result");
const errorDetails = document.getElementsByClassName("error-details").item(0);
const outputJs = document.getElementById("output-js");
const outputError = document.getElementById("output-error");
const outputConsole = document.getElementById("output-console");
const transpileError = document.getElementById("transpile-error");
const runtimeError = document.getElementById("runtime-error");

function execute() {
    const input = textarea.value;
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
        const jsCode = transpile(input);
        return {e: undefined, jsCode};
    } catch (e) {
        return {jsCode: undefined, e};
    }
}

function tryEvalAndCaptureOutput(code) {
    try {
        const original = console.log;
        let output = "";
        console.log = function() {
            output += Array.from(arguments).join(", ");
        };
        eval(code);
        console.log = original;
        return {e: undefined, output};
    } catch (e) {
        return {e, output: undefined};
    }
}

function onBlur() {
    chsResult.innerText = textarea.value;
    hljs.highlightBlock(chsResult);
    textareaHighlight.style.display = "block";
}

function onFocus() {
    textareaHighlight.style.display = "none";
}

function insertAtCursor(element, newText) {
    const start = element.selectionStart;
    const end = element.selectionEnd;
    const text = element.value;
    const before = text.substring(0, start);
    const after  = text.substring(end, text.length);
    element.value = (before + newText + after);
    element.selectionStart = element.selectionEnd = start + newText.length;
    element.focus();
}

executeButton.onclick = execute;
textarea.onfocus = onFocus;
textarea.onblur = onBlur;
textareaHighlight.onclick = function() {
    textarea.focus();
};
textarea.onkeydown = function(e) {
    const keyCode = e.keyCode || e.which;
    if (e.ctrlKey && keyCode === 13) {
        e.preventDefault();
        execute();
    } else if (keyCode === 9) {
        e.preventDefault();
        insertAtCursor(textarea, "\t");
    }
};

execute();
textarea.focus();
textarea.setSelectionRange(textarea.value.length, textarea.value.length);
