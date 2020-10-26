const DoublyLinkedList = require('./DoublyLinkedList');

class LRUCache {

    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.list = new DoublyLinkedList();
    }

    get(key) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            this.list.moveToTail(node);
            return node.val;
        }
        return null;
    }

    getAll() {
        const result = {};
        for (let [key, Node] of this.map) {
            result[key] = Node.val;
        }
        return result;
    }

    set(key, value) {
        if (!this.map.has(key)) {
            const newNode = DoublyLinkedList.createNode(value);
            newNode.key = key;
            this.list.appendNode(newNode);
            this.map.set(key, newNode);
            if (this.list.size > this.capacity) {
                this.map.delete(this.list.head.key);
                this.list.removeHead();
            }
        } else {
            const existingNode = this.map.get(key);
            existingNode.val = value;
            this.list.moveToTail(existingNode);
        }
    }

    remove(key) {
        if (!this.map.has(key)) {
            return false;
        }
        const Node = this.map.get(key);
        this.list.removeNode(Node);
        this.map.delete(key);
        return true;
    }

}

module.exports = LRUCache;