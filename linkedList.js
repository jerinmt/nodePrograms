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
            this.tail.next = newNode;
            newNode.previous = this.tail;
        }
        this.tail = newNode;
    }
    prepend(value) {
        const newNode = new Node(value);
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
    showHead() {
        return this.head.value;
    }
    showTail() {
        return this.tail.value;
    }
    at(index) {
        let pointer = this.head;
        let count = index;
        while(count) {
            if(pointer) {
                count -= 1;
                pointer = pointer.next;
            } else {
                return null;
            }
        }
        return pointer.value;
    }
    pop() {
        let pointer = this.head;
        while(pointer && pointer.next) {
            if(this.head.next==null) {
                this.head = null;
                this.tail = null;
            }
            else if(pointer.next.next) {
                pointer = pointer.next;
            } else {
                pointer.next = null;
                this.tail = pointer;
            }
        }
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
            index += 1;
        }
        return null;
    }
    toString() {
        let output = "";
        let pointer = this.head;
        while(pointer) {
            output += `( ${pointer.value}) -> `;
            pointer = pointer.next;
        }
        output = output + 'null';
        return output;
    }
    insertAt(value, index) {
        let pointer = this.head;
        let count = 0;
        while(count<index && pointer.next) {
            count += 1;
            pointer = pointer.next;
        }
        let newNode = new Node(value);
        newNode.next = pointer;
        newNode.previous = pointer.previous;
        newNode.previous.next = newNode;
        newNode.next.previous = newNode;
    }
    removeAt(index) {
        if(this.head.next===null) {
            this.head = null;
            return;
        }
        let pointer = this.head;
        let count = 0;
        while(count<index && pointer.next) {
            count += 1;
            pointer = pointer.next;
        }
        if(pointer) {
            if(index===0) {
                this.head = pointer.next;
                pointer.next.previous = null;
            } else {
                pointer.previous.next = pointer.next;
                pointer.next.previous = pointer.previous;
            }
        }
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