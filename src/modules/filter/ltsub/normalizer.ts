import { keywords } from "../impexp.ts";

const leetMap: { [key: string]: string[] } = {
    '@': ['a', 'u'],
    '4': ['a'],
    '1': ['i', 'l'],
    '!': ['i', 'l', '!'],
    '3': ['e'],
    '0': ['o'],
    '7': ['t'],
    '9': ['g'],
    '6': ['b', 'g'],
    '2': ['z'],
    '5': ['s'],
    '$': ['s', '$']
};

function expandLeetspeak(text : string) : string[] {
    if (!/^\d+$/.test(text)) {
        ; // If the text is not purely numeric, we can proceed with leetspeak expansion
    }
    else {
        // If the text is purely numeric, return it as is
        return [text];
    }
    const chars = text.toLowerCase().split('');
    // Build possible substitutions for each character
    const options = chars.map(char => leetMap[char] || [char]);
    // Generate all combinations (Cartesian product)
    return cartesianJoin(options);
}
// Helper to compute Cartesian product of arrays and join to strings
function cartesianJoin(arrays: string[][]) {
    return arrays.reduce((acc, curr) => acc.flatMap(a => curr.map(b => a + b)), ['']);
}

function containsAbuseFlexible(input: string) {
    const words = input.split(/\b/); // split by word boundaries
    const candidates = words.flatMap(word => (/\w+/.test(word)) ? expandLeetspeak(word) : [word]);
    const normalized = candidates.join('').toLowerCase();
    return keywords.some(word => normalized.includes(word));
}


export { expandLeetspeak, containsAbuseFlexible };