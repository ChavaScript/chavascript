import localizationSettings from "./localization_settings";

export function localizedKeyword(keyword) {
    return localizationSettings.keywords[keyword] || keyword
}

export function localizedOperator(operator) {
    return localizationSettings.operators[operator] || operator
}

export function localizeWord(word) {
    return localizationSettings.dictionary[word] || localizeWordAlphabetically(word)
}

export function localizeWordAlphabetically(word) {
    let result = ""
    for (const char of word) {
        result += localizationSettings.chars[char] || 'a'
    }
    return result
}
