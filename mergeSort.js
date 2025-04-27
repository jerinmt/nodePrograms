//merge sort
function mergeSort(arr) {
    //returning base case
    if(arr.length==1) {
        return arr;
    }
    //splitting to left and right
    let mid = Math.ceil(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    //merging    
    let i = 0;
    let j = 0;
    const result = [];
    while(i < left.length && j < right.length) {
        if(left[i] <= right[j]) {
            result.push(left[i]);
            i += 1;
        } else {
            result.push(right[j]);    
            j += 1;
        }
    }
    if(i==left.length) {
        while(j<right.length) {
            result.push(right[j]);
            j += 1;
        }
    } else {
        while(i<left.length) {
            result.push(left[i]);
            i += 1;
        }
    }
    return result;
}

console.log(mergeSort([105, 79, 100, 110]));