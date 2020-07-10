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
    event = this.events.undo();
    if (event) {
      if (event.operation.localeCompare('add')) {
        this.value -= event.value;
      }
      else {
        this.value += event.value;
      }
    }
  }

  redo() {
    event = this.events.redo();
    if (event) {
      if (event.operation.localeCompare('add')) {
        this.value += event.value;
      }
      else {
        this.value -= event.value;
      }
    }
  }

  bulk_undo(num) {

  }

  bulk_redo(num) {
    
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
      this.end = node;
      this.currEvent = this.end;
    }
    else { //overwrite the next redo-able action
      this.currEvent.next = node;
      this.currEvent = node;
    }
  }

  undo() {
    if (this.currEvent.prev) {
      this.currEvent = this.currEvent.prev;
      return this.currEvent.element;
    }
    return null;
  }

  redo() {
    if (this.currEvent.next) {
      this.currEvent = this.currEvent.next;
      return this.currEvent.element;
    }
    return null;
  }

}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
