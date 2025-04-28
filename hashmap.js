class LinkedList {
    constructor() {
        this.head = null;
        this.tail =null;
    }
    append(key, value) {
        const newNode = new Node(key, value);
        if(this.head==null) {
            this.head = newNode;
        } else {
            this.tail.next = newNode;
            newNode.previous = this.tail;
        }
        this.tail = newNode;
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
    contains(key) {
        let pointer = this.head;
        let index = 0;
        while(pointer) {
            if(key==pointer.key) {
                return index;
            }
            pointer = pointer.next;
            index += 1;
        }
        return false;
    }
    find(key) {
        let pointer = this.head;
        while(pointer) {
            if(key==pointer.key) {
                return pointer.value;
            }
            pointer = pointer.next;
        }
        return null;
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
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class HashMap {
    constructor() {
        this.load = 0.75;
        this.capacity = 16;
        this.buckets = [];
    }
    hash(key) {
        let hashCode = 0;
        const primeNumber = 37;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        }
        return hashCode;
    }
    hashNAdd(key, value) {
        let thisHash = this.hash(key);          
        if(this.buckets[thisHash]) {
            let pointer = this.buckets[thisHash].head;
            while(pointer) {
                if(pointer.key===key) {
                    pointer.value = value;
                    return;
                }
                pointer = pointer.next;
            }
            this.buckets[thisHash].append(key, value); 
        } else {
            const list = new LinkedList();
            this.buckets[thisHash] = list;
            this.buckets[thisHash].append(key, value);
        }
    }
    set(key, value) {
        if((this.mapLength() + 1) > (this.capacity * this.load)) {
            this.capacity *= 2;
            const temp = this.entries();
            for(let i=0; i<this.buckets.length;i++) {
                this.buckets[i] = null;
            }
            for(let i=0; i<temp.length;i++) {
                this.hashNAdd(temp[i][0], temp[i][1]);
            }
            this.hashNAdd(key, value);
        } else {
            this.hashNAdd(key, value);
        }
    }
    get(key) {
        let thisHash = this.hash(key);
        if(this.buckets[thisHash]) {
            return this.buckets[thisHash].find(key);
        } else {
            return null;
        }
    }
    has(key) {
        let thisHash = this.hash(key);
        if(this.buckets[thisHash]) {
            let result = this.buckets[thisHash].contains(key);
            if(result===false) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    remove(key) {
        let thisHash = this.hash(key);
        if(this.buckets[thisHash]) {
            let result = this.buckets[thisHash].contains(key);
            this.buckets[thisHash].removeAt(result);
            return true;
        } else {
            return false;
        }
    }
    mapLength() {
        let total = 0;
        for(let i=0; i<this.buckets.length;i++) {
            if(this.buckets[i]) {
                total += this.buckets[i].size();
            }
        }
        return total;
    }
    clear() {
        for(let i=0; i<this.buckets.length;i++) {
            this.buckets[i] = null;
            this.capacity = 16;
        }
    }
    keys() {
        const result = [];
        for(let i=0; i<this.buckets.length;i++) {
            if(this.buckets[i]) {
                let pointer = this.buckets[i].head;
                while(pointer) {
                    result.push(pointer.key);
                    pointer = pointer.next;
                }
            }
        }
        return result;
    }
    values() {
        const result = [];
        for(let i=0; i<this.buckets.length;i++) {
            if(this.buckets[i]) {
                let pointer = this.buckets[i].head;
                while(pointer) {
                    result.push(pointer.value);
                    pointer = pointer.next;
                }
            }
        }
        return result;
    }
    entries() {
        const result = [];
        for(let i=0; i<this.buckets.length;i++) {
            if(this.buckets[i]) {
                let pointer = this.buckets[i].head;
                while(pointer) {
                    result.push([pointer.key, pointer.value]);
                    pointer = pointer.next;
                }
            }
        }
        return result;
    }
}

export {HashMap};
