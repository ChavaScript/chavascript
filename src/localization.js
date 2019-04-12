import localizationSettings from "./localization_settings";

const reversedDictionary = {};
for (const key in localizationSettings.dictionary) {
    reversedDictionary[localizationSettings.dictionary[key]] = key;
}

export function localizedKeyword(keyword) {
    return localizationSettings.keywords[keyword] || keyword
}

export function localizedIdentifier(identifier) {
    return reversedDictionary[identifier] || identifier
}

export function translateIdentifier(identifier) {
    return localizationSettings.dictionary[identifier] || translateIdentifierAlphabetically(identifier)
}

export function translateIdentifierAlphabetically(identifier) {
    let result = ""
    for (const char of identifier) {
        result += localizationSettings.chars[char] || char
    }
    return result
}

export function isQuote(charCode) {
    for (const quote of localizationSettings.quotes) {
        if (charCode === quote.charCodeAt(0)) {
            return true
        }
    }
    return false
}
