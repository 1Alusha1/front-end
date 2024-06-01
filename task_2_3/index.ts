function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function sortByChoice(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== 1) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
}
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let leftIndex: number = 0;
    let rightIndex: number = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  const middle: number = Math.floor(arr.length / 2);
  const leftHalf: number[] = mergeSort(arr.slice(0, middle));
  const rightHalf: number[] = mergeSort(arr.slice(middle));

  return merge(leftHalf, rightHalf);
}




function generateRandomArray(size: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 1000));
  }
  return arr;
}

function measureTime(
  sortFunction: (arr: number[]) => number[],
  arr: number[]
): number {
  const startTime = performance.now();
  sortFunction(arr);
  const endTime = performance.now();
  return endTime - startTime;
}
const arraySizes: number[] = [100, 1000, 10000];
const sortFunctions = [
  bubbleSort,
  sortByChoice,
  insertionSort,
  mergeSort,
  quickSort,
];

for (const size of arraySizes) {
  console.log(`\nДля масиву розміром ${size}:`);
  const arr = generateRandomArray(size);

  for (const sortFunction of sortFunctions) {
    const time = measureTime(sortFunction, [...arr]);
    console.log(`${sortFunction.name}: ${time.toFixed(2)} мс`);
  }
}