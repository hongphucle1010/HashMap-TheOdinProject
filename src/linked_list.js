class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

export default class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
        this.tail = null;
    }

    append(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }

    prepend(data) {
        const node = new Node(data);
        node.next = this.head;
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
        this.size++;
    }

    at(index) {
        if (index >= this.size) {
            return null;
        }

        let counter = 0;
        let node = this.head;
        while (counter < index) {
            node = node.next;
            counter++;
        }
        return node;
    }

    pop() {
        if (!this.head) {
            return null;
        }
        if (this.head === this.tail) {
            const node = this.head;
            this.head = null;
            this.tail = null;
            this.size--;
            return node;
        }
        let prev = this.head;
        let node = this.head;
        while (node.next) {
            prev = node;
            node = node.next;
        }
        prev.next = null;
        this.tail = prev;
        this.size--;
        return node;
    }

    /**
     * Traverse the linked list
     * @param {Function} func 
     * @param {String} mode find / modify / has / delete
     * @returns 
     */
    traverse(func, mode = "find") {
        if (mode === "find") {
            let node = this.head;
            while (node) {
                if (func(node)) {
                    return node;
                }
                node = node.next;
            }
            return null;
        }
        if (mode === "modify") {
            let node = this.head;
            while (node) {
                if (func(node)) {
                    return node;
                }
                node = node.next;
            }
            return null;
        }
        if (mode === "has") {
            let node = this.head;
            while (node) {
                if (func(node)) {
                    return true;
                }
                node = node.next;
            }
            return false;
        }
        if (mode === "delete") {
            let prev = this.head;
            let node = this.head;
            while (node) {
                if (func(node)) {
                    if (node === this.head) {
                        this.head = this.head.next;
                        this.size--;
                        return node;
                    }
                    if (node === this.tail) {
                        this.tail = prev;
                    }
                    prev.next = node.next;
                    this.size--;
                    return node;
                }
                prev = node;
                node = node.next;
            }
            return null;
        }
        return null;
    }

    contains(value) {
        let node = this.head;
        while (node) {
            if (node.data === value) {
                return true;
            }
            node = node.next;
        }
        return false;
    }
    find(value) {
        let node = this.head;
        while (node) {
            if (node.data === value) {
                return node;
            }
            node = node.next;
        }
        return null;
    }

    // Format: ( value ) -> ( value ) -> ( value ) -> null
    toString() {
        let node = this.head;
        let str = "";
        while (node) {
            str += `(${node.data}) -> `;
            node = node.next;
        }
        return str + "null";
    }

    insertAt(index, data) {
        if (index > this.size) {
            return null;
        }
        if (index === 0) {
            this.prepend(data);
            return;
        }
        if (index === this.size) {
            this.append(data);
            return;
        }
        let node = new Node(data);
        let prev = this.at(index - 1);
        node.next = prev.next;
        prev.next = node;
        this.size++;
    }

    removeAt(index) {
        if (index >= this.size) {
            return null;
        }
        if (index === 0) {
            const node = this.head;
            this.head = this.head.next;
            this.size--;
            return node;
        }
        let prev = this.at(index - 1);
        const node = prev.next;
        prev.next = node.next;
        if (index === this.size - 1) {
            this.tail = prev;
        }
        this.size--;
        return node;
    }
}
