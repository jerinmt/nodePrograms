const fibs = function (number) {
    if(number<=0) {
        return null;
    }
    if(number==1) {
        return [0];
    }
    if(number==2) {
        return [0, 1];
    }
    let arr = fibs(number-1);
    let entry = arr[number-3] + arr[number-2]
    arr.push(entry);
    return arr;
}


console.log(fibs(20));