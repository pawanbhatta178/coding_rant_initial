/**
 * Note: we avoid using Javascript-specific string manipulation functions
 * so as to demonstrate how to solve this problem in other languages.
 * @param {string} str
 * @return {string} The word-reversed string.
 */
function reverseWords(str) {
    const wordList = [];
  
    for (let i = 0; i < str.length; i++) {
      if (str[i] == ' ') continue;
  
      // Encounters a non-space character.
      let tempWord = str[i];
  
      // If the next character is still part of the word, add that to
      // tempWord.  Repeat until the next character is no longer so.
      while ((i+1) < str.length && str[i+1] != ' ') {
        tempWord += str[i+1];
        i++;
      }
  
      wordList.push(tempWord);
    }
  
    // Constructs the word-reversed string.
    let reversedStr = '';
    for (let i = wordList.length - 1; i >= 0; i--) {
      // Inserts an empty space if needed.
      reversedStr += (reversedStr != '')
        ? ' ' + wordList[i] 
        : wordList[i];
    }
  
    return reversedStr;
  }
module.exports = reverseWords;