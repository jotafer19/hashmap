class Node {
    constructor(key) {
        this.key = key;
        this.next = null;
    }
}

class HashSet {
    constructor() {
        this.buckets = new Array(16).fill(null);
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

    set(key) {
        const index = this.hash(key);
        const newNode = new Node(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
          }

        if (!this.buckets[index]) {
            this.buckets[index] = newNode;
            this.resize()
        } else {
            let current = this.buckets[index];
            if (current.key === key) {
                console.log('dupe')
                return;
            }
    
            while (current.next) {
                current = current.next;
                if (current.key === key) return;
            }
    
            current.next = newNode;
        }
    }

    resize() {
        let filledBuckets = 0;
        this.buckets.forEach(bucket => {
            if (bucket) filledBuckets++;
        })
        
        if (filledBuckets / this.buckets.length >= this.loadFactor) {
            const newBuckets = new Array(this.buckets.length).fill(null);
            this.buckets = this.buckets.concat(newBuckets);
        }
    }

    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let current = this.buckets[index];

        while (current) {
            if (current.key === key) return true;
            current = current.next;
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        let current = this.buckets[index];

        while (current) {
            if (current.key === key) return true;
            current = current.next;
        }

        return false;
    }

    remove(key) {
        if (!this.has(key)) return false;

        const index = this.hash(key);

        if (this.buckets[index].key === key) {
            this.buckets[index] = this.buckets[index].next;
            return true;
        }

        let current = this.buckets[index];
        let previous;

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

    length() {
        let numberOfKeys = 0;

        this.buckets.forEach(bucket => {
            while (bucket) {
                numberOfKeys++;
                bucket = bucket.next;
            }
        })

        return numberOfKeys;
    }

    clear() {
        this.buckets = new Array(16).fill(null);
    }

    keys() {
        const array = [];

        this.buckets.forEach(bucket => {
            while (bucket) {
                array.push(bucket.key);
                bucket = bucket.next;
            }
        })

        return array;
    }
}

const hashSet = new HashSet();
hashSet.set('makima')
hashSet.set('aki')
hashSet.set('denji')
hashSet.set('himeno')
hashSet.set('kobeni')
hashSet.set('power')
hashSet.set('surtr')
hashSet.set('texas')
hashSet.set('chen')
hashSet.set('lappland')
hashSet.set('eyja')
hashSet.set('pozy')
hashSet.set('math')
hashSet.set('hoshi')
hashSet.set('saga')
hashSet.set('siege')
hashSet.set('exusiai')
hashSet.set('asa')
hashSet.set('satoru')
hashSet.set('montoya')
hashSet.set('denji')
hashSet.set('reze')
console.log(hashSet.buckets)
console.log(hashSet.get('makima'))
console.log(hashSet.has('skfy'))
console.log(hashSet.remove('himeno'))
console.log(hashSet.remove('satoru'))
console.log(hashSet.length())
console.log(hashSet.keys())
hashSet.clear()
console.log(hashSet.buckets)