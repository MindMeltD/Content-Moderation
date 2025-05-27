import { expandLeetspeak } from '../filter/normalizer.js';
const tests = [
    { input: "H@te", expected: "hate" },
    { input: "N1gg3r", expected: "nigger" },
    { input: "K1LL a11 j3ws", expected: "kill all jews" },
    { input: "Go b@ck!", expected: "go back!" },
    { input: "12345", expected: "12345" }, // check that numbers stay
    { input: "He11o W0rld!", expected: "hello world!" }, // punctuation test
    { input: "F@ck y0u!", expected: "fuck you!" }, // punctuation test
    { input: "N1663r", expected: "nigger" }
];
for (const { input, expected } of tests) {
    const result = expandLeetspeak(input);
    // console.log(`Input: "${input}" → "${result}"`);
    const passed = result.some(abuse => abuse === expected);
    console.log(`${passed ? '✅' : '❌'} Input: "${input}" → "${result}" ${!passed ? `(expected: "${expected}")` : ''}`);
}