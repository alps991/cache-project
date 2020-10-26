class DoublyLinkedList {

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    appendNode(newNode) {
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
    }

    removeHead() {
        if (this.head) {
            const oldHead = this.head;
            this.head = this.head.next;
            if (this.head) this.head.prev = null;
            oldHead.next = null;
            this.size--;
        }
    }

    removeNode(Node) {
        if (this.head === Node) {
            this.removeHead();
        } else {
            const prevNode = Node.prev;
            const nextNode = Node.next;
            prevNode.next = nextNode;
            if (nextNode) nextNode.prev = prevNode;
            Node.next = null;
            Node.prev = null;
        }
        this.size--;
    }

    moveToTail(Node) {
        if (this.tail === Node) return null;
        if (this.head === Node) {
            this.removeHead();
            this.appendNode(Node);
            return null;
        }

        let prevNode = Node.prev;
        let nextNode = Node.next;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        this.tail.next = Node;
        Node.prev = this.tail;
        Node.next = null;
        this.tail = Node;
    }

    print() {
        if (!this.head) console.log("Empty List");
        let curNode = this.head;
        let i = 0;
        while (curNode) {
            console.log(`(${i}) -------------`);
            console.log(curNode.prev && curNode.prev.val, "-", curNode.val, "-", curNode.next && curNode.next.val);
            curNode = curNode.next;
            i++;
        }
    }

    static createNode(val = null, prev = null, next = null, key = null) {
        return { val, prev, next, key }
    }
}

module.exports = DoublyLinkedList;