import { AnalysisError } from './AnalysisError'

export class SyntaticError extends AnalysisError {
  position: number
  received: string
  expected: string

  constructor(position: number, received: string, expected: string) {
    super()
    this.position = position
    this.received = received
    this.expected = expected
  }

  getErrorMessage() {
    return `Erro na linha ${this.position} - ${this.received} ${this.expected}`
  }
}
