const DIGIT_TO_LETTERS = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
  }
  

  function letterCombinations(digits) {
    // Handles edge case.
    if (digits == "") {
      return [];
    }
  
    const output = [];
    findCombinations(digits, 0, '', output);
    return output;
  };
  
  
  function findCombinations(digits, index, prefix, output) {
    // Handles terminal condition.
    if (index == digits.length) {
      output.push(prefix);
      return;
    }
  
    // Picks a letter, then recurses on the next digit.
      const letters = DIGIT_TO_LETTERS[digits[index]];
    for (let i = 0; i < letters.length; i++) {
      findCombinations(digits, index + 1, prefix + letters[i], output);
    }
  }

module.exports = letterCombinations;