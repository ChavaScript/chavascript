const localizationSettings = {
    keywordOverrides: {
        "arguments": "סעיפים",
        "boolean": "בוליאן",
        "break": "שבור",
        "byte": "בית",
        "case": "מקרה",
        "catch": "תפוס",
        "char": "תו",
        "const": "קבוע",
        "continue": "המשך",
        "debugger": "נפאי",
        "default": "ברירתמחדל",
        "delete": "מחק",
        "do": "עשה",
        "else": "אחרת",
        "double": "דובל",
        "eval": "שערך",
        "true": "חיובי",
        "false": "שלילי",
        "final": "סופי",
        "finally": "לבסוף",
        "float": "צף",
        "for": "עבור",
        "function": "יכולת",
        "goto": "לךאל",
        "if": "אם",
        "implements": "מיישם",
        "in": "מתוך",
        "instanceof": "מסוג",
        "int": "שלם",
        "interface": "ממשק",
        "let": "יהי",
        "long": "ארוך",
        "native": "יליד",
        "new": "חדש",
        "null": "כלום",
        "package": "חבילה",
        "private": "פרטי",
        "protected": "מוגן",
        "public": "פומבי",
        "return": "החזר",
        "short": "קצר",
        "static": "נייח",
        "switch": "החלף",
        "synchronized": "מתואם",
        "this": "אנוכי",
        "throw": "זרוק",
        "throws": "זורק",
        "transient": "חולף",
        "try": "נסה",
        "typeof": "סוגשל",
        "var": "משתנה",
        "void": "ריק",
        "volatile": "תנודתי",
        "while": "כלעוד",
        "with": "עם",
        "yield": "הנב",
        "class": "מחלקה",
        "enum": "מנייה",
        "export": "ייצא",
        "extends": "מרחיבה",
        "import": "ייבא",
        "super": "אבא",
    },
    operatorOverrides: {
        "||": "או",
        "&&": "וגם",
    },
    publicVarOverrides: {
        "בקרה": "console",
        "בקרה.תעד": "console.log",
    },
    charOverrides: {
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
    }
};

export function localizedKeyword(keyword) {
    return localizationSettings.keywordOverrides[keyword] || keyword
}

export function localizedOperator(operator) {
    return localizationSettings.operatorOverrides[operator] || operator
}

export function localizeWord(word) {
    let result = ""
    for (const char of word) {
        result += localizationSettings.charOverrides[char] || char
    }
    return result
}

export function translateVariables(code) {
    const overrides = [];
    for (const key in localizationSettings.publicVarOverrides) {
        const value = localizationSettings.publicVarOverrides[key]
        overrides.push({key, value});
    }
    overrides.sort((a, b) => {
        if (a.key.indexOf(b.key) > -1) {
            return -1
        }
        return 1
    })
    let result = code
    for (const override of overrides) {
        const regexp = new RegExp(override.key.split(".").map(word => `\\s?${word}\\s?`).join("\\."), "g")
        result = result.replace(regexp, override.value)
    }
    return result
}
