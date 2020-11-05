import { AnalysisError } from './AnalysisError'

export class SemanticError extends AnalysisError {

  constructor() {
    super()
  }

  getErrorMessage() {
    return `Semantico não implementado`
  }
}
