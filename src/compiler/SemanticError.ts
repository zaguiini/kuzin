import { AnalysisError } from './AnalysisError'

export class SemanticError extends AnalysisError {
  private msg: string
  private line: number

  constructor(msg: string, line: number) {
    super()
    this.msg = msg
    this.line = line
    this.message = this.getMessage()
  }

  getMessage = () => `Erro na linha ${this.line} - ${this.msg}`
}
