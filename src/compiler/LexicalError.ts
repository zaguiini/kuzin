import { AnalysisError } from './AnalysisError'

export class LexicalError extends AnalysisError {
  position: number
  description: string

  constructor(description: string, position: number) {
    super()

    console.log('Erro léxico')
    this.description = description
    this.position = position

    this.message = this.getErrorMessage()
  }

  getErrorMessage = () => {
    return `Erro na linha ${this.position} - ${this.description}`
  }
}
