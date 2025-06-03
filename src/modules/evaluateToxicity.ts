import "./filter/exact/simpleFilter.ts";
import "./filter/ltsub/normalizer.js";
import "./filter/fuzzy/fuzzymatch.ts";
import "./filter/MLFilter/AiFilter.ts";
import "./filter/impexp.ts"
import { keywords, usernames } from "./filter/impexp.ts";
import { containsAbuseFlexible } from "./filter/ltsub/normalizer.js";
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
    // Check for abusive language using leetspeak variations
    else if (containsAbuseFlexible(text)) {
        score += 4;
    }
    // Check for misspellings of keywords
    else if (keywords.some(keyword => fuzzyMatch(text, [keyword]))) {
        score += 3;
    }

    if (score >= 5) {
        return score;
    }

    // if (score === 0 && text.length > 0) {
    //     const predictions = await AiFilter.classifyText([text]);
    //     // predictions is expected to be an array of objects with a 'results' property
    //     if (Array.isArray(predictions)) {
    //         predictions.forEach(prediction => {
    //             if (prediction.results && Array.isArray(prediction.results)) {
    //                 prediction.results.forEach((result: any) => {
    //                     if (result.match) {
    //                         score += 2;
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // }

    return score;

}

export default evaluateToxicity;