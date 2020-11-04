export class AnalysisError extends Error {
  private position: number

  constructor(msg: string, position = -1) {
    super(msg)
    this.position = position
    this.message = `Erro na linha ${this.position} - ${msg}`
  }

  getPosition() {
    return this.position
  }
}
