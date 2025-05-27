"use strict";
const hatePatterns = [
    /\bn+ig+e*r+\b/, // normalized n-word
    /\bkill+all+\b/, // "kill all" phrase
    /\bjews?\b/, // "jew" or "jews"
    /\bfag+(got|t)?\b/, // "fag", "faggot"
    /\btrann(y|ie)?\b/, // "tranny", "trannie"
    /\bretard(ed)?\b/, // "retard", "retarded"
    /\bgay+\b/, // repeated or emphasized use of "gay"
    /\bgo+ba+ck+(to)?\b/, // "go back", e.g. in xenophobic phrases
    /\byou+(are|'re)?\b.*\b(scum|vermin|trash)\b/, // dehumanizing patterns
];

export default hatePatterns;