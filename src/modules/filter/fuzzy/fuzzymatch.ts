// Levenshtein Distance implementation
export type Aggressiveness = 'strict' | 'medium' | 'low';

const aggressivenessThresholds: Record<Aggressiveness, number> = {
  strict: 3,
  medium: 2,
  low: 1
};

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  const lenA = a.length;
  const lenB = b.length;

  if (lenA === 0) return lenB;
  if (lenB === 0) return lenA;

  for (let i = 0; i <= lenA; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= lenB; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[lenA][lenB];
}

function isHateSpeech(
  text: string,
  keywordList: string[],
  aggressiveness: Aggressiveness = 'medium'
): boolean {

  const normalizedText = text.toLowerCase();
  const words = normalizedText.split(/\s+/);
  const threshold = aggressivenessThresholds[aggressiveness];

  for (const word of words) {
    for (const keyword of keywordList) {
        if (word === keyword.toLowerCase()) {
          return true; // Exact match found
        }
        if (levenshtein(word, keyword) <= threshold) {
          return true; // Fuzzy match found
        }
    }
  }
  return false; // No match found
}

export function fuzzyMatch(
  text: string,
  keywordList: string[],
  aggressiveness: Aggressiveness = 'medium'
): boolean {
  return isHateSpeech(text, keywordList, aggressiveness);
}