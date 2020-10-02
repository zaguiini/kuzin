export class AnalysisError extends Error {
    private position: number;

    constructor(msg: string, position: number = -1) {
        super(msg);
        this.position = position;
        this.message = msg + ", @ " + this.position;
    }

    getPosition() {
        return this.position;
    }
}
