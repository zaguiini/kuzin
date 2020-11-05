import { AnalysisError } from './AnalysisError'

export class SemanticError extends AnalysisError {
  constructor() {
    super()

    this.message = this.getErrorMessage()
  }

  getErrorMessage = () => {
    return `Semantico não implementado`
  }
}
