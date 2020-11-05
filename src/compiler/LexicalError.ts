import { AnalysisError } from './AnalysisError'

export class LexicalError extends AnalysisError {
  position: number
  description: string

  constructor(description: string, position: number) {
    super()
    this.description = description
    this.position = position
  }

  getErrorMessage() {
    return `Erro na linha ${this.position} - ${this.description}`
  }
}
