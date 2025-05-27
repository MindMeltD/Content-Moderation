
function evaluateToxicity(text: string): number {
    // Simple keyword-based toxicity scoring (for demonstration)
    const toxicWords = ['hate', 'stupid', 'idiot', 'dumb', 'kill'];
    const words = text.toLowerCase().split(/\W+/);
    let score = 0;

    for (const word of words) {
        if (toxicWords.includes(word)) {
            score += 1;
        }
    }

    // Normalize score to a value between 0 and 1
    return Math.min(score / toxicWords.length, 1);
}

export default evaluateToxicity;