import { AnalysisError } from "./AnalysisError";

export class LexicalError extends AnalysisError {
    constructor(msg: string, position?: number) {
        super(msg, position);
    }
}