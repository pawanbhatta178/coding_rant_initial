/**
 * @param {array<number>} array 
 * @return {bool} whether the array is monotonic.
 */
function monotonicArray(array) {
    let increaseObserved = false;
    let decreaseObserved = false;
  
    for (let i = 1; i < array.length; i++) {
      if (array[i] > array[i - 1]) {
        increaseObserved = true;
      } else if (array[i] < array[i - 1]) {
        decreaseObserved = true;
      }
  
      // If both increase and decrease are observed, the
      // array is not monotonic.
      if (increaseObserved && decreaseObserved) {
        return false;
      }
    }
  
    return true;
}
  
module.exports = monotonicArray;