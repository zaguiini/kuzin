import { AnalysisError } from "./AnalysisError";

export class SemanticError extends AnalysisError {
    constructor(msg: string, position?: number) {
        super(msg, position);
    }
}