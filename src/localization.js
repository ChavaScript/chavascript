import localizationSettings from "./localization_settings";

const reversedKeywords = reverseObject(localizationSettings.keywords)
const reversedDictionary = reverseObject(localizationSettings.dictionary)

export function localizedKeyword(keyword) {
    return localizationSettings.keywords[keyword] || keyword
}

export function localizedIdentifier(identifier) {
    return localizationSettings.dictionary[identifier] || identifier
}

export function translateIdentifier(identifier) {
    return reversedDictionary[identifier] || translateIdentifierAlphabetically(identifier)
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

export function isKeyword(word) {
    return word in reversedKeywords
}

export function reverseKeyword(word) {
    return reversedKeywords[word]
}

function reverseObject(obj) {
    const result = {}
    for (const key in obj) {
        const value = obj[key]
        result[value] = key
    }
    return result
}
