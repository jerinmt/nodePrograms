import { mergeSort } from "./mergeSort.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree(arr);
    }
    buildTree(arr) {
        this.arr = mergeSort(arr);
        for(let i=1;i<this.arr.length; i++) {
            if(this.arr[i]==this.arr[i-1]) {
                this.arr.splice(i,1);
                i -= 1;
            }
        }
        return this.makeNodes(this.arr, 0, this.arr.length-1);
    }
    makeNodes(arr, start, end) {
        if (start > end) return null;
        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(arr[mid]);
        root.left = this.makeNodes(arr, start, mid - 1);
        root.right = this.makeNodes(arr, mid + 1, end);
        return root;
    }
    insertItem(value) {
        let pointer = this.root;
        while(pointer) {
            if(pointer.data > value) {
                if(pointer.left===null) {
                    let newNode = new Node(value);
                    pointer.left = newNode;
                    return;
                }
                pointer = pointer.left;
            } else if(pointer.data < value) {
                if(pointer.right===null) {
                    let newNode = new Node(value);
                    pointer.right = newNode;
                    return;
                }
                pointer = pointer.right;
            } else {
                return;
            }
        }
    }
    findSuccessor(pointer) {
        pointer = pointer.right;
        while (pointer !== null && pointer.left !== null) {
            pointer = pointer.left;
        }
        return pointer;
    }
    deleteNode(value, pointer) {
        if (pointer === null) {
            return pointer;
        }
        if (pointer.data > value) {
            pointer.left = this.deleteNode(value, pointer.left);
        } else if (pointer.data < value) {
            pointer.right = this.deleteNode(value, pointer.right);
        } else {
            if (pointer.left === null) 
                return pointer.right;
            if (pointer.right === null) 
                return pointer.left;
            let successor = this.findSuccessor(pointer);
            pointer.data = successor.data;
            pointer.right = this.deleteNode(successor.data, pointer.right);
        }
        return pointer;
    }
    deleteItem(value) {
        this.root = this.deleteNode(value, this.root);
    }
    find(value) {
        let pointer = this.root;
        while(pointer) {
            if(pointer.data === value) {
                return pointer;
            } else if(pointer.data > value) {
                pointer = pointer.left;
            } else {
                pointer = pointer.right;
            }
        }
        return null;
    }
    levelOrder(callback) {
        if(typeof(callback)!= 'function') {
            throw new Error("A callback function is required");
        }
        let queue = [];
        let pointer = this.root;
        queue.push(pointer);
        while(queue.length>0) {
            pointer = queue.shift();
            callback(pointer);
            if(pointer.left) {
                queue.push(pointer.left);
            }
            if(pointer.right) {
                queue.push(pointer.right);
            }
        }
    }
    preOrderRec(pointer, callback) {
        if (pointer === null) {
            return;
        }
        callback(pointer);
        this.preOrderRec(pointer.left, callback);
        this.preOrderRec(pointer.right, callback);
    }
    preOrder(callback) {
        if(typeof(callback)!= 'function') {
            throw new Error("A callback function is required");
        }
        this.preOrderRec(this.root, callback);
    }
    inOrderRec(pointer, callback) {
        if (pointer === null) {
            return;
        }
        this.inOrderRec(pointer.left, callback);
        callback(pointer);
        this.inOrderRec(pointer.right, callback);
    }
    inOrder(callback) {
        if(typeof(callback)!= 'function') {
            throw new Error("A callback function is required");
        }
        this.inOrderRec(this.root, callback);
    }
    postOrderRec(pointer, callback) {
        if (pointer === null) {
            return;
        }
        this.postOrderRec(pointer.left, callback);
        this.postOrderRec(pointer.right, callback);
        callback(pointer);
    }
    postOrder(callback) {
        if(typeof(callback)!= 'function') {
            throw new Error("A callback function is required");
        }
        this.postOrderRec(this.root, callback);
    }
    heightRec(pointer) {
        let leftHeight = 0;
        let rightHeight = 0;
        if(pointer.left) {
            leftHeight = this.heightRec(pointer.left) + 1;
        }
        if(pointer.right) {
            rightHeight = this.heightRec(pointer.right) + 1;
        }
        if(leftHeight > rightHeight) {
            return leftHeight;
        }
        return rightHeight;
    }
    height(value) {
        let pointer = this.root;
        while(pointer) {
            if(pointer.data === value) {
                return this.heightRec(pointer);
            }
            if(pointer.data > value) {
                pointer = pointer.left;
            } else {
                pointer = pointer.right;
            }
        }
        return null;
    }
    depth(value) {
        let pointer = this.root;
        let depth = 0;
        while(pointer) {
            if(pointer.data === value) {
                return depth;
            }
            if(pointer.data > value) {
                depth += 1;
                pointer = pointer.left;
            } else {
                depth += 1;
                pointer = pointer.right;
            }
        }
        return null;
    }
    balanced(pointer) {
        let leftHeight = 0;
        let rightHeight = 0;
        if(pointer.left) {
            leftHeight = this.heightRec(pointer.left)+ 1;
        }
        if(pointer.right) {
            rightHeight = this.heightRec(pointer.right) + 1;
        }
        if((leftHeight === rightHeight) || ((leftHeight-1)===rightHeight) || ((rightHeight-1)===leftHeight)) {
            let isLeft = true;
            let isRight = true;
            if(pointer.left) {
                isLeft = this.balanced(pointer.left);
            }
            if(pointer.right) {
                isRight = this.balanced(pointer.right);
            }
            if(isLeft && isRight) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }
    isBalanced() {
        let pointer = this.root;
        return this.balanced(pointer);
    }
    rebalance(){
        this.arr = [];
        this.inOrder((item)=> {
            this.arr.push(item.data);
        });
        this.root = this.buildTree(this.arr);
    }
}

export {Tree};