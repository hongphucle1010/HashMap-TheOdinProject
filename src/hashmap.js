import LinkedList from "./linked_list";
export default class HashMap {
    constructor(capacity = 16, load_factor = 0.8) {
        this.size = 0;
        this.capacity = capacity;
        this.load_factor = load_factor;
        this.buckets = new Array(this.capacity)
            .fill(null)
            .map(() => new LinkedList());
    }
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % this.capacity;
    }

    set(key, value) {
        const index = this.hash(key);
        console.log(index);
        const bucket = this.buckets[index];
        const node = bucket.traverse((node) => node.data.key === key);

        if (node) {
            node.data.value = value;
        } else {
            bucket.append({ key, value });
            this.size++;
            this.resize();
        }
    }

    resize() {
        if (this.size < this.capacity * this.load_factor) return;

        this.capacity *= 2;
        this.size = 0;
        const oldBuckets = this.buckets;
        this.buckets = new Array(this.capacity)
            .fill(null)
            .map(() => new LinkedList());

        oldBuckets.forEach((bucket) => {
            let current = bucket.head;
            while (current) {
                this.set(current.data.key, current.data.value);
                current = current.next;
            }
        });
    }

    entries() {
        const entries = [];
        this.buckets.forEach((bucket) => {
            let current = bucket.head;
            while (current) {
                entries.push([current.data.key, current.data.value]);
                current = current.next;
            }
        });
        return entries;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        return bucket.traverse((node) => node.data.key === key, "has");
    }

    has(key) {
        return !!this.get(key);
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        return !!bucket.traverse((node) => node.data.key === key, 'delete');
    }

    clear() {
        this.buckets = new Array(this.capacity)
            .fill(null)
            .map(() => new LinkedList());
        this.size = 0;
    }
    keys() {
        return this.entries().map(([key, value]) => key);
    }
    values() {
        return this.entries().map(([key, value]) => value);
    }
}
