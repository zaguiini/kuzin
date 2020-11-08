import { AnalysisError } from './AnalysisError'

export class SyntacticError extends AnalysisError {
  position: number
  received: string
  expected: string

  constructor(position: number, received: string, expected: string) {
    super()
    this.position = position
    this.received = received
    this.expected = expected
    this.message = this.getErrorMessage()
  }

  getErrorMessage = () => {
    return `Erro na linha ${this.position} - ${this.received} ${this.expected}`
  }
}
