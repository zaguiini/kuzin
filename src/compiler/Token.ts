import { Constants } from './Constants'
import { ScannerConstants } from './ScannerConstants'

export class Token {
  private id: number
  private line!: number
  private lexeme: string
  private position: number

  constructor(id: number, lexeme: string, position: number) {
    this.id = id
    this.lexeme = lexeme
    this.position = position
  }

  getId(): number {
    return this.id
  }

  getLexeme(): string {
    return this.lexeme
  }

  getLine(): number {
    return this.line
  }

  getPosition(): number {
    return this.position
  }

  setLine(line: number): void {
    this.line = line
  }

  toString(): string {
    return `${this.id} ( ${this.lexeme} ) @ ${this.position}`
  }

  getClasse(): string {
    for (let i = 0; i < ScannerConstants.SPECIAL_CASES_VALUES.length; i++) {
      const valor = ScannerConstants.SPECIAL_CASES_VALUES[i]

      if (valor == this.id) {
        return ScannerConstants.SPECIAL_CASES_KEYS[i]
      }

      switch (this.id) {
        case Constants.t_id:
          return 'identificador'
        case Constants.t_c_int:
          return 'palavra reservada'
        case Constants.t_c_float:
          return 'palavra reservada'
        case Constants.t_c_str:
          return 'palavra reservada'
        case Constants.t_int:
          return 'palavra reservada'
        case Constants.t_float:
          return 'palavra reservada'
        case Constants.t_str:
          return 'palavra reservada'
        case Constants.t_TOKEN_24:
          return 'simbolo especial'
        case Constants.t_TOKEN_25:
          return 'simbolo especial'
        case Constants.t_TOKEN_26:
          return 'simbolo especial'
        case Constants.t_TOKEN_27:
          return 'simbolo especial'
        case Constants.t_TOKEN_28:
          return 'simbolo especial'
        case Constants.t_TOKEN_29:
          return 'simbolo especial'
        case Constants.t_TOKEN_30:
          return 'simbolo especial'
        case Constants.t_TOKEN_31:
          return 'simbolo especial'
        case Constants.t_TOKEN_32:
          return 'simbolo especial'
        case Constants.t_TOKEN_33:
          return 'simbolo especial'
        case Constants.t_TOKEN_34:
          return 'simbolo especial'
        case Constants.t_TOKEN_35:
          return 'simbolo especial'
        case Constants.t_TOKEN_36:
          return 'simbolo especial'
        case Constants.t_TOKEN_37:
          return 'simbolo especial'
        case Constants.t_TOKEN_38:
          return 'simbolo especial'
        case Constants.t_TOKEN_39:
          return 'simbolo especial'
      }
    }
    return ''
  }
}
