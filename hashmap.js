class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class createLinkedList {
    constructor() {
        this.head = null;
    }

    append(key, value) {
        const newNode = new Node(key, value);

        if (!this.head) return this.head = newNode;

        let currentNode = this.head;
        if (currentNode.key === key) return currentNode.value = value;

        while (currentNode.next) {
            currentNode = currentNode.next;
            if (currentNode.key === key) return currentNode.value = value;
        }

        currentNode.next = newNode;
    }

    prepend(value) {
        const newNode = new Node(value);

        newNode.next = this.head;

        this.head = newNode;
    }

    size() {
        let count = 0;
        let currentNode = this.head;

        while (currentNode) {
            count++;
            currentNode = currentNode.next;
        }

        return count;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        if (!this.head) return this.head;

        let currentNode = this.head;

        while (currentNode.next) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }

    at(index) {
        if (!this.head) return this.head;

        let currentNode = this.head;

        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
            if (!currentNode) return null;
        }

        return currentNode;
    }

    pop() {
        if (!this.head) return;

        if (!this.head.next) return this.head = null;

        let currentNode = this.head;
        let previous;

        while (currentNode.next) {
            previous = currentNode;
            currentNode = currentNode.next;
        }

        previous.next = null;
    }

    contain(key) {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.key === key) return true;
            currentNode = currentNode.next;
        }

        return false;
    }

    find(key) {
        let currentNode = this.head;

        while (currentNode) {
            if (currentNode.key === key) return currentNode.value;
            currentNode = currentNode.next;
        }

        return null;
    }

    toString() {
        let currentNode = this.head;
        let result = '';

        while (currentNode) {
            result += `(${currentNode.data}) -> `;
            currentNode = currentNode.next;
        }

        return result += 'null';
    }

    insertAt(key, value, index) {
        if (index === 0) return this.prepend(key, value);

        const newNode = new Node(key, value);
        
        let currentNode = this.head;
        let previous;

        for (let i = 0; i < index; i++) {
            previous = currentNode;
            currentNode = currentNode.next;
            if (!currentNode) return 'No valid index';
        }

        previous.next = newNode;
        newNode.next = currentNode;
    }

    removeAt(key) {
        let current = this.head;
        let previous;

        if (!current) return false;

        if (current.key === key) {
            this.head = current.next;
            return true;
        }

        while (current.next) {
            previous = current;
            current = current.next;
            if (current.key === key) {
                previous.next = current.next;
                return true;
            }
        }
        
        return false;
    }
}

class HashMap {
    constructor() {
        this.buckets = Array.from({ length: 16 }, () => new createLinkedList())
        this.loadFactor = 0.75;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode += primeNumber * i + key.charCodeAt(i);
        }

        return hashCode % this.buckets.length;
    }

    set(key, value) {
        const index = this.hash(key);

        this.buckets[index].append(key, value);

        this.resize();
    }

    get(key) {
        const index = this.hash(key);

        return this.buckets[index].find(key)
    }

    has(key) {
        const index = this.hash(key);

        return this.buckets[index].contain(key);
    }

    remove(key) {
        const index = this.hash(key);

        return this.buckets[index].removeAt(key);
    }

    length() {
        let storedKeys = 0;

        this.buckets.forEach(bucket => {
            let current = bucket.head;

            while (current) {
                storedKeys++;
                current = current.next;
            }
        })

        return storedKeys;
    }

    clear() {
        this.buckets = Array.from({ length: 16 }, () => new createLinkedList())
    }

    keys() {
        const array = [];

        this.buckets.forEach(bucket => {
            let current = bucket.head;

            while (current) {
                array.push(current.key);
                current = current.next;
            }
        })

        return array;
    }

    values() {
        const array = [];

        this.buckets.forEach(bucket => {
            let current = bucket.head;

            while (current) {
                array.push(current.value);
                current = current.next;
            }
        })

        return array;
    }

    entries() {
        const array = [];

        this.buckets.forEach(bucket => {
            let current = bucket.head;

            while (current) {
                array.push([current.key, current.value]);
                current = current.next;
            }
        })

        return array;
    }

    resize() {
        let filledBuckets = 0;

        this.buckets.forEach(bucket => {
            if (bucket.head) filledBuckets++;
        })

        if (filledBuckets / this.buckets.length >= this.loadFactor) {
            const newBuckets = Array.from({ length: this.buckets.length }, () => new createLinkedList());
            this.buckets = this.buckets.concat(newBuckets);
        }
    }
}

const hashMap = new HashMap();
hashMap.set('makima', 1234)
hashMap.set('aki', 2345)
hashMap.set('denji', 7625)
hashMap.set('himeno', 3764)
hashMap.set('kobeni', 8374)
hashMap.set('power', 2837)
hashMap.set('surtr', 9999)
hashMap.set('texas', 3729)
hashMap.set('chen', 2872)
hashMap.set('lappland', 8372)
hashMap.set('eyja', 2937)
hashMap.set('pozy', 8272)
hashMap.set('swire', 2827)
hashMap.set('hoshiguma', 8272)
hashMap.set('saga', 29383)
hashMap.set('siege', 2827)
hashMap.set('exusiai', 2827)
hashMap.set('asa', 2288)
hashMap.set('silverhand', 8271)
hashMap.set('toki', 2828)
hashMap.set('yoru', 2232)
hashMap.set('denji', 1000)
hashMap.set('reze', 1000)
console.log(hashMap.get('reze'))
console.log(hashMap.has('dhdy'))
console.log(hashMap.remove('denji'))
console.log(hashMap.remove('reze'))
console.log(hashMap.remove('eff'))
console.log(hashMap.remove('lappland'))
console.log(hashMap.remove('swire'))
console.log(hashMap.length())
console.log(hashMap.keys())
console.log(hashMap.values())
console.log(hashMap.entries())
console.log(hashMap.buckets)
hashMap.clear()
console.log(hashMap.buckets)