function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
const isNumericToken = (s) => /\d/.test(s);

function matchSingleItem(transcript, trackingItem) {
  const transcriptWords = normalize(transcript).split(" ");
  const trackingWords = normalize(trackingItem).split(" ");

  return trackingWords.every(tWord =>
    transcriptWords.some(word => {
      if (isNumericToken(tWord)) {
        return word === tWord; // exact match only for numbers
      }
      return levenshtein(word, tWord) <= 1;
    })
  );
}

export function isRelevant(transcript, selectedTracking) {
  const trackingItems = selectedTracking
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  return trackingItems.some(item => matchSingleItem(transcript, item));
}