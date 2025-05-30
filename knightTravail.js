const queue = [];
const adjVertices = [
    [10, 17], [11, 16, 18], [8, 12, 17, 19], [9, 13, 18, 20], 
    [10, 14, 19, 21], [11, 15, 20, 22], [12, 21, 23], [13, 22], 
    [2, 18, 25], [3, 19, 24, 26], [0, 4, 16, 20, 25, 27], [1, 5, 17, 21, 26, 28], 
    [2, 6, 18, 22, 27, 29], [3, 7, 19, 23, 28, 30], [4, 20, 29, 31], [5, 21, 30], 
    [1, 10, 26, 33], [0, 2, 11, 27, 32, 34], [1, 3, 8, 12, 24, 28, 33, 35], [2, 4, 9, 13, 25, 29, 34, 36], 
    [3, 5, 10, 14, 26, 30, 35, 37], [4, 6, 11, 15, 27, 31, 36, 38], [5, 7, 12, 28, 37, 39], [6, 13, 29, 38], 
    [9, 18, 34, 41], [8, 10, 19, 35, 40, 42], [9, 11, 16, 20, 32, 36, 41, 43], [10, 12, 17, 21, 33, 37, 42, 44], 
    [11, 13, 18, 22, 34, 38, 43, 45], [12, 14, 19, 23, 35, 39, 44, 46], [13, 15, 20, 36, 45, 47], [14, 21, 37, 46], 
    [17, 26, 42, 49], [16, 18, 27, 43, 48, 50], [17, 19, 24, 28, 40, 44, 49, 51], [18, 20, 25, 29, 41, 45, 50, 52], 
    [19, 21, 26, 30, 42, 46, 51, 53], [20, 22, 27, 31, 43, 47, 52, 54], [21, 23, 28, 44, 53, 55], [22, 29, 45, 54], 
    [25, 34, 50, 57], [24, 26, 35, 51, 56, 58], [25, 27, 32, 36, 48, 52, 57, 59], [26, 28, 33, 37, 49, 53, 58, 60], 
    [27, 29, 34, 38, 50, 54, 59, 61], [28, 30, 35, 39, 51, 55, 60, 62], [29, 31, 36, 52, 61, 63], [30, 37, 53, 62], 
    [33, 42, 58], [32, 34, 43, 59], [33, 35, 40, 44, 56, 60], [34, 36, 41, 45, 57, 61], 
    [35, 37, 42, 46, 58, 62], [36, 38, 43, 47, 59, 63], [37, 39, 44, 60], [38, 45, 61], 
    [41, 50], [40, 42, 51], [41, 43, 48, 52], [42, 44, 49, 53], 
    [43, 45, 50, 54], [44, 46, 51, 55], [45, 47, 52], [46, 53] 
];

const turnToCode = function (notation) {
    let [x, y] = notation;
    return (x * 8 + y);
}

const turnToNotation = function (code) {
    let x = Math.floor(code/8);
    let y = code % 8;
    return [x, y];
}

const breadthFirstSearch = function (path, end) {
    let current = path[path.length-1];
    for(let i=0; i<adjVertices[current].length; i++) {
        if(adjVertices[current][i]==end) {
            return [...path, adjVertices[current][i]];
        }
        queue.push([...path, adjVertices[current][i]]);
    }
    return null;
}

const knightMoves = function (source, destination) {
    const start = turnToCode(source);
    const end = turnToCode(destination);
    let path = null;
    queue[0] = [start];
    if(start === end) {
        path = [start];
    }
    while(path===null) {
        path = breadthFirstSearch(queue[0], end);
        queue.shift();
    }
    let result = [];
    for(let i=0; i<path.length; i++) {
        result[i] = turnToNotation(path[i]);
    }
    console.log(`${path.length-1} is the number of steps`);
    return result;
}


export{knightMoves};