import '../modules/filter/MLFilter/AiFilter';
import AiFilter from '../modules/filter/MLFilter/AiFilter';

const testCases = [
  {
    input: "N1663r.",
    expected: true
  },
  {
    input: "F@ck y0u.",
    expected: true
  },
  {
    input: "He11o W0rld.",
    expected: false
  },
  {
    input: "Go b@ck",
    expected: true
  },
  {
    input: "K1LL a11 j3ws", 
    expected: true
  },
  {
    input: "N1gg3r", 
    expected: true
  }
]



export function runTests() {
    console.log("Running tests...\n");

    testCases.forEach(({ input }) => {
        AiFilter.classifyText([input]);
        // const result = classifyText(input);
        // const pass = result === expected;
        // console.log(
        //     `Test #${idx + 1} ${pass ? '✅ PASS' : '❌ FAIL'}\n` +
        //     `  Text:      "${input}"\n` +
        //     `  Detected:  ${result}, Expected: ${expected}\n`
        // );
    });
}