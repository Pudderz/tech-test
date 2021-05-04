function quickSort(array) {
    if (array.length <= 1) return array;
    const pivot = array.pop();
    const lessThanContainer = [];
    const greaterThanContainer = [];
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] <= pivot) {
        lessThanContainer.push(array[i]);
      } else {
        greaterThanContainer.push(array[i]);
      }
    }
  
    return [
      ...quickSort(lessThanContainer),
      pivot,
      ...quickSort(greaterThanContainer),
    ];
  }

module.exports = quickSort;