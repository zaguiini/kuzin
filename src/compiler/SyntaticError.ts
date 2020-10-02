import { AnalysisError } from "./AnalysisError";

export class SyntaticError extends AnalysisError {
    constructor(msg: string, position?: number) {
        super(msg, position);
    }
}