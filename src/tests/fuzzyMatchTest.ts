import '../modules/filter/fuzzy/fuzzymatch.ts'; // Adjust path as needed
import { fuzzyMatch } from '../modules/filter/fuzzy/fuzzymatch.ts';

const testCases = [
  {
    input: "This contains the word slur1.",
    expected: true,
    aggressiveness: 'strict'
  },
  {
    input: "This has the word sluur1 with a typo.",
    expected: true,
    aggressiveness: 'low'
  },
  {
    input: "This has no bad content at all.",
    expected: false,
    aggressiveness: 'medium'
  },
  {
    input: "badw0rd appears here", // 'badword' with a 1-char edit
    expected: true,
    aggressiveness: 'low'
  },
  {
    input: "b@dw0rd appears here", // 2-char edit
    expected: true,
    aggressiveness: 'medium'
  }
];

const bannedWords = ['slur1', 'offensiveword', 'badword'];

export function runTests() {
    console.log("Running tests...\n");

    testCases.forEach(({ input, expected, aggressiveness }, idx) => {
    const result = fuzzyMatch(input, bannedWords, aggressiveness as any);
    const pass = result === expected;
    console.log(
        `Test #${idx + 1} [${aggressiveness}] - ${pass ? '✅ PASS' : '❌ FAIL'}\n` +
        `  Text:      "${input}"\n` +
        `  Detected:  ${result}, Expected: ${expected}\n`
    );
    });
}