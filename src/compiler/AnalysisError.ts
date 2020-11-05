export class AnalysisError extends Error {

    constructor() {
        super();
        this.message = this.getErrorMessage();
    }

    getErrorMessage(): string {
        throw new Error("Não implementado")
    }

}
