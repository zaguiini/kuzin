export class Stack {
    private stack: any[];

    constructor() {
        this.stack = [];
    }
    push(item: any) {
        this.stack.push(item);
    }

    pop(): any {
        return this.stack.pop();
    }

    clear() {
        this.stack = [];
    }

    empty(): boolean {
        return this.stack.length == 0;
    }
}