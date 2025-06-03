import { containsAbuseFlexible } from '../modules/filter/ltsub/normalizer.ts';
const tests = [
    { input: "H@te", expected: false },
    { input: "N1gg3r", expected: true },
    { input: "K1LL a11 j3ws", expected: true },
    { input: "Go b@ck!", expected: false },
    { input: "12345", expected: false }, // check that numbers stay
    { input: "He11o W0rld!", expected: false }, // punctuation test
    { input: "F@ck y0u!", expected: true }, // punctuation test
    { input: "N1663r", expected: true }
];
for (const { input, expected } of tests) {
    const result = containsAbuseFlexible(input);
    // console.log(`Input: "${input}" → "${result}"`);
    const passed = (result === expected);
    console.log(`${passed ? '✅' : '❌'} Input: "${input}" → "${result}" ${!passed ? `(expected: "${expected}")` : ''}`);
}