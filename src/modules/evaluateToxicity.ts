import "./filter/Keyword/KeywordFilter.ts";
import "./filter/fuzzy/fuzzymatch.ts";
import "./filter/manager/remoteFetch.ts"
import { keywords, usernames } from "./filter/manager/remoteFetch.ts";
import { fuzzyMatch } from "./filter/fuzzy/fuzzymatch.ts";
// import AiFilter from "./filter/MLFilter/AiFilter.ts";


async function evaluateToxicity(text: string): Promise<number> {
    let score = 0;

    // Check the usual suspects
    if (usernames.some(username => text.includes(username))) {
        score += 5;
    }

    // Check for hateful or abusive plain language (slurs, etc.)
    if (keywords.some(keyword => text.includes(keyword))) {
        score += 5;
    }
    
    // Check for misspellings of keywords
    if (keywords.some(keyword => fuzzyMatch(text, [keyword]))) {
        score += 3;
    }

    if (score >= 5) {
        return score;
    }

    return score;

}

export default evaluateToxicity;