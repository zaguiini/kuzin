export class Stack<T extends any> {
  private stack: T[]

  constructor() {
    this.stack = []
  }
  push(item: T) {
    this.stack.push(item)
  }

  pop() {
    return this.stack.pop()!
  }

  clear() {
    this.stack = []
  }

  empty(): boolean {
    return this.stack.length == 0
  }
}
