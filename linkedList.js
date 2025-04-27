class LinkedList {
    constructor() {
        this.head = null;
        this.tail =null;
    }
    append(value) {
        const newNode = new Node(value);
        if(this.head==null) {
            this.head = newNode;
        } else {
            let pointer = this.head;
            while(pointer) {
                if(!pointer.next) {
                    pointer.next = newNode;
                    newNode.previous = pointer;
                }
                pointer = pointer.next;
            }
            newNode.previous = this.tail;
        }
        this.tail = newNode;
    }
    prepend(value) {
        const newNode = new Node();
        newNode.value = value;
        if(this.head==null) {
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.previous = newNode;
        }
        this.head = newNode;
    }
    size() {
        let total = 0;
        let pointer = this.head;
        while(pointer) {
            total += 1;
            pointer = pointer.next;
        } 
        return total;
    }
    head() {
        return this.head;
    }
    tail() {
        return this.tail;
    }
    at(index) {
        let pointer = this.head;
        for(let i=0;i<index;i++) {
            if(!pointer) {
                console.log("Index doesn't exist!");
                return null;
            }
            pointer = pointer.next;
        }
        return pointer;
    }
    pop() {
        this.tail = this.tail.previous;
        this.tail.next = null;
    }
    contains(value) {
        let pointer = this.head;
        while(pointer) {
            if(value==pointer.value) {
                return true;
            }
            pointer = pointer.next;
        }
        return false;
    }
    find(value) {
        let pointer = this.head;
        let index = 0;
        while(pointer) {
            if(value==pointer.value) {
                return index;
            }
            pointer = pointer.next;
        }
        return null;
    }
    toString() {
        let output = "";
        let pointer = this.head;
        while(pointer) {
            output += `( ${pointer.value}) -> `;
        }
        output = output + 'null';
        return output;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

export {LinkedList};