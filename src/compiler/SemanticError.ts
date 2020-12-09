import { AnalysisError } from './AnalysisError'

export class SemanticError extends AnalysisError {
  constructor(msg: string) {
    super()
    this.message = msg
  }
}
