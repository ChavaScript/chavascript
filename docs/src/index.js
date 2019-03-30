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
const results = document.getElementById("results");
const error = document.getElementById("error");
const errorDetails = document.getElementsByClassName("error-details").item(0);

function execute() {
    const input = textarea.value;
    const {jsCode, e} = tryTranspile(input);
    if (e) {
        errorDetails.innerText = e.toString();
        results.style.display = "none";
        error.style.display = "block";
    } else {
        results.style.display = "block";
        error.style.display = "none";
        jsResult.innerText = jsCode;
        hljs.highlightBlock(jsResult);
        result.innerText = evalAndCaptureOutput(jsCode);
    }
}

function tryTranspile(input) {
    try {
        const jsCode = transpile(input);
        return {e: undefined, jsCode};
    } catch (e) {
        return {jsCode: undefined, e};
    }
}

function evalAndCaptureOutput(code) {
    const original = console.log;
    let result = "";
    console.log = function() {
        result += Array.from(arguments).join(", ");
    };
    eval(code);
    console.log = original;
    return result;
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
