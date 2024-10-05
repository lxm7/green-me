// Simple compose function (right-to-left function composition)
export const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

// Simple curry function to handle partial application
export const curry =
  (fn) =>
  (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...rest) => curry(fn)(...args, ...rest);

// Helper function to normalize the term (lowercase and remove hyphens/spaces)
const normalizeTerm = (term) => term.toLowerCase().replace(/[-\s]/g, "");

// Curried function to check if the term contains 3 matching characters from a word
const containsThreeChars = curry((word, term) => {
  for (let length = 3; length <= term.length; length++) {
    for (let i = 0; i <= term.length - length; i++) {
      const substring = term.slice(i, i + length); // Get substring of length 3 or more
      if (word.includes(substring)) {
        return word; // Return the word if any substring is found
      }
    }
  }
  return null; // Return null if no matching substring is found
});

// Composed function to normalize and then check for a match with 'coffee' or 'tshirt'
export const checkForMatch = compose(
  (normalizedTerm) =>
    containsThreeChars("coffee", normalizedTerm) ||
    containsThreeChars("tshirt", normalizedTerm),
  normalizeTerm
);

export const matchesTerm = (string, term) =>
  checkForMatch(string.toLowerCase()) === checkForMatch(term.toLowerCase());
