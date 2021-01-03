const classifiedKeywords = {
    "variables": {
        "var": "משתנה",
        "let": "יהי",
        "const": "קבוע",
    },
    "function": {
        "function": "יכולת",
        "return": "החזירי",
        "yield": "הנבי",
        "arguments": "טיעונים",
    },
    "boolean": {
        "true": "אמת",
        "false": "שקר",
    },
    "if": {
        "if": "אם",
        "else": "אחרת",
    },
    "loops": {
        "for": "עבור",
        "of": "של",
        "in": "מתוך",
        "while": "כאשר",
        "do": "עשי",
        "break": "שברי",
        "continue": "המשיכי",
    },
    "switch": {
        "switch": "החליפי",
        "case": "מקרה",
        "default": "ברירתמחדל",
    },
    "try": {
        "try": "נסי",
        "catch": "תפסי",
        "finally": "ולבסוף",
        "throw": "זרקי",
    },
    "oop": {
        "class": "מחלקה",
        "this": "אנוכי",
        "new": "צרי",
        "null": "כלום",
        "extends": "מרחיבה",
        "super": "אמא",
        "instanceof": "מסוג",
        "static": "נייח",
    },
    "other": {
        "delete": "השמידי",
        "typeof": "סוגשל",
        "goto": "לכיאל",
        "eval": "שערכי",
        "with": "עם",
        "debugger": "קוטלחרקים",
        "import": "ייבאי",
        "export": "ייצאי",
    },
    "safety": {
        "package": "חבילה",
        "interface": "ממשק",
        "implements": "מיישמת",
        "private": "פרטי",
        "protected": "מוגן",
        "public": "פומבי",
        "native": "יליד",
        "synchronized": "מתואם",
        "throws": "זורק",
        "transient": "חולף",
        "void": "ריק",
        "volatile": "תנודתי",
        "enum": "מנייה",
        "final": "סופי",
    },
    "types": {
        "float": "צף",
        "int": "שלם",
        "long": "ארוך",
        "char": "תו",
        "short": "קצר",
        "double": "דובל",
        "byte": "בית",
        "boolean": "בוליאן",
    },
};
const classifiedDictionary = {
    "generic": {
        "console": "בקרה",
        "undefined": "תוהו",
        "NaN": "לאמספר",
        "Infinity": "אינסוף",
        "JSON": "פנחס",
        "prototype": "אבטיפוס",
        "constructor": "בנאי",
        "eval": "שערכי",
        "window": "חלון",
        "document": "מסמך",
    },
    "functions": {
        "setTimeout": "קבעי_תזמון",
        "clearTimeout": "בטלי_תזמון",
        "setInterval": "קבעי_חזרתיות",
        "clearInterval": "בטלי_חזרתיות",
        "parseFloat": "נתחי_צף",
        "parseInt": "נתחי_שלם",
        "isFinite": "האם_סופי",
        "isNaN": "האם_לאמספר",
        "decodeURI": "פענחי_כתובת_אתר",
        "decodeURIComponent": "פענחי_רכיב_כתובת_אתר",
        "encodeURI": "קודדי_כתובת_אתר",
        "encodeURIComponent": "קודדי_רכיב_כתובת_אתר",
        "escape": "בצעי_בריחה",
        "unescape": "בטלי_בריחה",
        "require": "דרשי",
    },
    "classes": {
        "Object": "עצם",
        "Function": "היכולת",
        "Boolean": "הבוליאן",
        "Number": "מספר",
        "Date": "תאריך",
        "String": "המחרוזת",
        "RegExp": "ביטוי_סדיר",
        "Array": "מערך",
        "Buffer": "חיץ",
        "Set": "קבוצה",
        "Map": "מפה",
        "Promise": "הבטחה",
        "Math": "חשבון",
    },
    "console": {
        "error": "שגיאה",
        "log": "תעד",
        "clear": "נקה",
        "debug": "ניפוי",
        "info": "מידע",
        "trace": "עקבות",
        "warn": "אזהר",
    },
    "json": {
        "stringify": "מחרז",
        "parse": "פענח",
    },
    "promise": {
        "reject": "הפר",
        "resolve": "ממש",
        "all": "כולם",
        "race": "מירוץ",
        "then": "ואז",
        "catch": "תפוס",
    },
    "math": {
        "abs": "ערך_מוחלט",
        "ceil": "תקרה",
        "floor": "רצפה",
        "max": "מירבי",
        "min": "מזערי",
        "pow": "חזקה",
        "random": "אקראי",
        "round": "עגל",
        "sqrt": "שורש",
    },
    "array": {
        "concat": "שרשר",
        "length": "אורך",
        "entries": "רשומות",
        "filter": "סנן",
        "find": "מצא",
        "forEach": "לכל",
        "includes": "כולל",
        "indexOf": "מספר_סידורי_של",
        "join": "צרף",
        "keys": "מפתחות",
        "lastIndexOf": "מספר_סידורי_אחרון_של",
        "map": "מפה",
        "pop": "שלוף",
        "push": "דחוף",
        "reduce": "הפחת",
        "reverse": "הפוך",
        "shift": "הסט",
        "slice": "פרוס",
        "some": "כלשהו",
        "sort": "מיין",
        "splice": "אחה",
        "toString": "למחרוזת",
        "unshift": "בטל_הסט",
    },
    "string": {
        "charAt": "תו_ב",
        "charCodeAt": "קוד_תו_ב",
        "endsWith": "מסתיים_ב",
        "match": "התאם",
        "repeat": "חזור",
        "replace": "החלף",
        "search": "חפש",
        "split": "פצל",
        "startsWith": "מתחיל_ב",
        "substr": "תת_מחרוז",
        "substring": "תת_מחרוזת",
        "trim": "קצץ",
    },
};

function flattenObject(obj) {
    const result = {};
    for (const k in obj) {
        const nested = obj[k];
        for (const key in nested) {
            const value = nested[key];
            result[key] = value;
        }
    }
    return result;
}

export default {
    keywords: flattenObject(classifiedKeywords),
    dictionary: flattenObject(classifiedDictionary),
    chars: {
        "א": "a",
        "ב": "b",
        "ג": "g",
        "ד": "d",
        "ה": "h",
        "ו": "v",
        "ז": "z",
        "ח": "h",
        "ט": "t",
        "י": "i",
        "כ": "k",
        "ל": "l",
        "מ": "m",
        "נ": "n",
        "ס": "s",
        "ע": "a",
        "פ": "p",
        "צ": "z",
        "ק": "k",
        "ר": "r",
        "ש": "sh",
        "ת": "t",
        "ן": "n",
        "ם": "m",
        "ך": "ch",
        "ף": "f",
        "ץ": "z"
    },
    quotes: [
        '"',
        "'",
        "״",
        "׳",
    ],
    classifiedKeywords,
    classifiedDictionary,
}
