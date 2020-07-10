class EventSourcer {
  constructor() {
    this.value = 0;
    this.events = new List();
  }

  add(num) {}
  subtract(num) {}
  undo() {}
  redo() {}
  bulk_undo(num) {}
  bulk_redo(num) {}
}

//doubly linked list node
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

//simple doubly linked list implementation
class List {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }

  add(node) {
    if (this.size == 0) {
      this.start = node;
      this.end = node;
    }
    else {
      this.end.next = node;
      this.end = node;
    }
    this.size++;
  }

  remove() {
    if (this.size > 1) {
      newEnd = this.end.prev;
      this.end = newEnd;
    }
    else {
      this.start = null;
      this.end = null;
    }
    this.size--;
  }

}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
