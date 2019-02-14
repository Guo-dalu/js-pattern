function quickSort(arr) {
  if(arr.length <= 1) {
    return arr
  }
  if(arr.length === 2) {
    return arr[0] > arr[1]? [arr[1], arr[0]]:[arr[0], arr[1]]
  }
  else {
    const midIndex = Math.round(arr.length/2)
    const pivot = arr[midIndex], left = [], right = []
    arr.splice(midIndex, 1)
    arr.forEach(element => {
      if(element > pivot) {
        right.push(element)
      }
      else left.push(element)
    })
    return quickSort(left).concat(pivot, quickSort(right))
  }
}

console.log(quickSort([5, 23, 12, 2, 0, -12, 234]))