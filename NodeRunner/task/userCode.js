
const reverseStrings = (str1, str2) => {
  return [reverseString(str1),
    reverseString(str2)]
}
const reverseString = (str) => {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newStrin;
}

module.exports=reverseStrings;