class EventSourcer {
  constructor() {
    this.value = 0;
    this.events = new List();
  }

  add(num) {
    this.value += num;
    this.events.addNode(new Node({'operation': 'add', 'value': num}));
  }

  subtract(num) {
    this.value -= num;
    this.events.addNode(new Node({'operation': 'subtract', 'value': num}));
  }

  undo() {
    let event = this.events.undo();
    if (event) {
      if (0 == event.operation.localeCompare('add')) {
        this.value -= event.value;
      }
      else {
        this.value += event.value;
      }
    }
  }

  redo() {
    let event = this.events.redo();
    if (event) {
      if (0 == event.operation.localeCompare('add')) {
        this.value += event.value;
      }
      else {
        this.value -= event.value;
      }
    }
  }

  bulk_undo(num) {
    for (let i = 0; i < num; i++) {
      this.undo();
    }
  }

  bulk_redo(num) {
    for (let i = 0; i < num; i++) {
      this.redo();
    }
  }
}

//doubly linked list node
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  }
}

//doubly linked list implementation
class List {
  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
    this.currEvent = null;
  }

  addNode(node) {
    if (this.size == 0) {
      this.start = node;
      this.end = node;
      this.currEvent = this.end;
    }
    else if (this.currEvent == this.end) { //if there is nothing to redo
      this.end.next = node;
      node.prev = this.end;
      this.end = node;
      this.currEvent = this.end;
    }
    else { //overwrite the next redo-able action (replace the next node)
      let temp = this.currEvent.next;
      node.next = temp.next;
      node.prev = temp.prev;

      temp.prev = node;
      this.currEvent.next = node;
      this.currEvent = node;
    }
    this.size++;
  }

  undo() {
    if (this.currEvent) {
      let element = this.currEvent.element;
      this.currEvent = this.currEvent.prev;
      return element;
    }
    return null;
  }

  redo() {
    if (this.currEvent && this.currEvent.next) {
      this.currEvent = this.currEvent.next;
      return this.currEvent.element;
    }
    return null;
  }

}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
