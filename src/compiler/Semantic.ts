import { SemanticError } from './SemanticError'
import { Token } from './Token'

export class Semantico {
  private id: string
  private operador: string
  private operadorAtribuicao: string
  private codigo: string[]
  private pilhaTipos: string[]
  private pilhaRotulos: string[]
  private tabelaSimbolos: Record<string, string>
  private rotuloAtual: number
  private getLine: () => number

  constructor() {
    this.id = ''
    this.operador = ''
    this.getLine = () => 0
    this.operadorAtribuicao = ''
    this.codigo = []
    this.pilhaTipos = []
    this.pilhaRotulos = []
    this.tabelaSimbolos = {}
    this.rotuloAtual = 1
  }

  setup(getLine: () => number) {
    this.getLine = getLine
    this.id = ''
    this.operador = ''
    this.operadorAtribuicao = ''
    this.codigo = []
    this.pilhaTipos = []
    this.pilhaRotulos = []
    this.tabelaSimbolos = {}
    this.rotuloAtual = 1
  }

  getId() {
    return this.id
  }

  getCodigo() {
    return this.codigo
  }

  executeAction(action: number, token: Token | null) {
    switch (action) {
      case 1:
        this.acao01()
        break
      case 2:
        this.acao02()
        break
      case 3:
        this.acao03()
        break
      case 4:
        this.acao04()
        break
      case 5:
        this.acao05(token!)
        break
      case 6:
        this.acao06(token!)
        break
      case 7:
        this.acao07()
        break
      case 8:
        this.acao08()
        break
      case 9:
        this.acao09(token!)
        break
      case 10:
        this.acao10()
        break
      case 11:
        this.acao11()
        break
      case 12:
        this.acao12()
        break
      case 13:
        this.acao13()
        break
      case 14:
        this.acao14()
        break
      case 15:
        this.acao15()
        break
      case 16:
        this.acao16()
        break
      case 17:
        this.acao17()
        break
      case 18:
        this.acao18()
        break
      case 19:
        this.acao19()
        break
      case 20:
        this.acao20()
        break
      case 21:
        this.acao21(token!)
        break
      case 22:
        this.acao22(token!)
        break
      case 23:
        this.acao23(token!)
        break
      case 24:
        this.acao24()
        break
      case 25:
        this.acao25(token!)
        break
      case 26:
        this.acao26()
        break
      case 27:
        this.acao27()
        break
      case 28:
        this.acao28()
        break
      case 29:
        this.acao29()
        break
      case 30:
        this.acao30()
        break
      case 31:
        this.acao31()
        break
      case 32:
        this.acao32()
        break
      case 33:
        this.acao33()
        break
      case 34:
        this.acao34()
        break
      case 35:
        this.acao35(token!)
        break
      case 36:
        this.acao36()
        break
      default:
        return 'Ação semântica não implementada: ' + action
    }
  }

  acao01() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (
      (tipo1 !== 'float64' && tipo1 !== 'int64') ||
      (tipo2 !== 'float64' && tipo2 !== 'int64')
    ) {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      this.codigo.push('add')

      if (tipo1 === 'float64' || tipo2 === 'float64') {
        this.pilhaTipos.push('float64')
        this.codigo.push('conv.r8')
      } else {
        this.pilhaTipos.push('int64')
      }
    }
  }

  acao02() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (
      (tipo1 !== 'float64' && tipo1 !== 'int64') ||
      (tipo2 !== 'float64' && tipo2 !== 'int64')
    ) {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      if (tipo1 === 'float64' || tipo2 === 'float64') {
        this.pilhaTipos.push('float64')
        this.codigo.push('conv.r8')
      } else {
        this.pilhaTipos.push('int64')
      }

      this.codigo.push('sub')
    }
  }

  acao03() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (
      (tipo1 !== 'float64' && tipo1 !== 'int64') ||
      (tipo2 !== 'float64' && tipo2 !== 'int64')
    ) {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      if (tipo1 === 'float64' || tipo2 === 'float64') {
        this.pilhaTipos.push('float64')
      } else {
        this.pilhaTipos.push('int64')
      }

      this.codigo.push('mul')
    }
  }

  acao04() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (
      (tipo1 !== 'float64' && tipo1 !== 'int64') ||
      (tipo2 !== 'float64' && tipo2 !== 'int64')
    ) {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      if (tipo1 === 'float64' || tipo2 === 'float64') {
        this.pilhaTipos.push('float64')
        this.codigo.push('conv.r8')
      } else {
        this.pilhaTipos.push('int64')
        this.codigo.push('conv.i8')
      }

      this.codigo.push('div')
    }
  }

  acao05(token: Token) {
    this.pilhaTipos.push('int64')
    this.codigo.push(`ldc.i8 ${token.getLexeme()}`)
    this.codigo.push('conv.r8')
  }

  acao06(token: Token) {
    this.pilhaTipos.push('float64')
    this.codigo.push(`ldc.r8 ${token.getLexeme()}`)
  }

  acao07() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (
      (tipo1 !== 'float64' && tipo1 !== 'int64') ||
      (tipo2 !== 'float64' && tipo2 !== 'int64')
    ) {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      if (tipo1 === 'float64' || tipo2 === 'float64') {
        this.pilhaTipos.push('float64')
      } else {
        this.pilhaTipos.push('int64')
      }
      this.codigo.push('add')
    }
  }

  acao08() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (
      (tipo1 !== 'float64' && tipo1 !== 'int64') ||
      (tipo2 !== 'float64' && tipo2 !== 'int64')
    ) {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      if (tipo1 === 'float64' || tipo2 === 'float64') {
        this.pilhaTipos.push('float64')
      } else {
        this.pilhaTipos.push('int64')
      }
      this.codigo.push('sub')
    }
  }

  acao09(token: Token) {
    this.operador = token.getLexeme()
  }

  acao10() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (tipo1 !== tipo2) {
      throw new SemanticError(
        'tipos incompatíveis em expressão relacional',
        this.getLine()
      )
    }

    this.pilhaTipos.push('bool')

    switch (this.operador) {
      case '>':
        return this.codigo.push('cgt')

      case '<':
        return this.codigo.push('clt')

      case '==':
        return this.codigo.push('ceq')

      default:
        throw new SemanticError(
          `operador ${this.operador} não implementado`,
          this.getLine()
        )
    }
  }

  acao11() {
    this.pilhaTipos.push('bool')
    this.codigo.push(`ldc.i8 true`)
    this.codigo.push('conv.r8')
  }

  acao12() {
    this.pilhaTipos.push('bool')
    this.codigo.push(`ldc.i8 false`)
    this.codigo.push('conv.r8')
  }

  acao13() {
    const tipo = this.pilhaTipos.pop()

    if (tipo != 'bool') {
      throw new SemanticError(
        'tipos incompatíveis em expressão lógica',
        this.getLine()
      )
    } else {
      this.pilhaTipos.push('bool')
      this.codigo.push('not')
    }
  }

  acao14() {
    const tipo = this.pilhaTipos.pop()!

    if (tipo === 'int64') {
      this.codigo.push('conv.i8')
    }

    this.codigo.push(`call void [mscorlib]System.Console::Write(${tipo})`)
    this.pilhaTipos.push(tipo)
  }

  acao15() {
    this.codigo.push('.entrypoint')
  }

  acao16() {
    this.codigo.push('ret')
  }

  acao17() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (tipo1 != 'bool' || tipo2 != 'bool') {
      throw new SemanticError(
        'tipos incompatíveis em expressão lógica',
        this.getLine()
      )
    } else {
      this.pilhaTipos.push('bool')
      this.codigo.push('and')
    }
  }

  acao18() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (tipo1 != 'bool' || tipo2 != 'bool') {
      throw new SemanticError(
        'tipos incompatíveis em expressão lógica',
        this.getLine()
      )
    } else {
      this.pilhaTipos.push('bool')
      this.codigo.push('or')
    }
  }

  acao19() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (tipo1 !== 'int64' || tipo2 !== 'int64') {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      this.pilhaTipos.push('int64')
    }
    this.codigo.push('div')
  }

  acao20() {
    const tipo1 = this.pilhaTipos.pop()
    const tipo2 = this.pilhaTipos.pop()

    if (
      (tipo1 !== 'float64' && tipo1 !== 'int64') ||
      (tipo2 !== 'float64' && tipo2 !== 'int64')
    ) {
      throw new SemanticError(
        'tipos incompatíveis em expressão aritmética',
        this.getLine()
      )
    } else {
      if (tipo1 === 'float64' || tipo2 === 'float64') {
        this.pilhaTipos.push('float64')
      } else {
        this.pilhaTipos.push('int64')
      }

      this.codigo.push('rem')
    }
  }

  acao21(token: Token) {
    let string = token.getLexeme()
    if (string[0] === "'" && string[string.length - 1] === "'") {
      string = '"' + string.substr(1, string.length - 2) + '"'
    }
    this.pilhaTipos.push('string')
    this.codigo.push(`ldstr ${string}`)
  }

  acao22(token: Token) {
    this.id = token.getLexeme()
  }

  acao23(token: Token) {
    this.operadorAtribuicao = token.getLexeme()

    if (!(this.id in this.tabelaSimbolos)) {
      throw new SemanticError('identificador não declarado', this.getLine())
    }
    if (this.tabelaSimbolos[this.id] === 'int64') {
      this.codigo.push('conv.r8')
    }
    this.codigo.push(`ldloc ${this.id}`)
  }

  acao24() {
    let tipoId: string

    if (this.id in this.tabelaSimbolos) {
      tipoId = this.tabelaSimbolos[this.id]
      this.pilhaTipos.pop()
    } else {
      tipoId = this.pilhaTipos.pop()!
      this.tabelaSimbolos[this.id] = tipoId
      this.codigo.push(`.locals (${tipoId} ${this.id})`)
    }
    if (tipoId === 'int64') {
      this.codigo.push('conv.i8')
    }
    this.codigo.push(`stloc ${this.id}`)
  }

  acao25(token: Token) {
    const tipo = token.getLexeme()
    let tipoVar: string

    switch (tipo) {
      case 'int':
        tipoVar = 'int64'
        break
      case 'float':
        tipoVar = 'float64'
        break
      case 'str':
        tipoVar = 'string'
        break
      default:
        tipoVar = 'string'
    }
    if (!(this.id in this.tabelaSimbolos)) {
      this.tabelaSimbolos[this.id] = tipoVar
      this.codigo.push(`.locals (${this.tabelaSimbolos[this.id]} ${this.id})`)
    }
  }

  acao26() {
    const tipoEntrada = this.tabelaSimbolos[this.id]

    const parserNamespace =
      {
        bool: 'Boolean',
        int64: 'Int64',
        float64: 'Double',
      }[tipoEntrada as 'int64' | 'float64' | 'bool'] || 'String'

    this.codigo.push('call string [mscorlib]System.Console::ReadLine()')

    this.codigo.push(
      `call ${tipoEntrada} [mscorlib]System.${parserNamespace}::Parse(string)`
    )

    this.codigo.push(`stloc ${this.id}`)
  }

  acao27() {
    this.codigo.push(`brfalse ${this.criarRotulo()}`)
  }

  acao28() {
    while (this.pilhaRotulos.length > 0) {
      this.codigo.push(`${this.pilhaRotulos.pop()}:`)
    }
  }

  acao29() {
    const rotuloNovo = this.criarRotulo()
    this.pilhaRotulos.pop()
    this.codigo.push(`br ${rotuloNovo}`)
    this.codigo.push(`${this.pilhaRotulos.pop()}:`)
    this.pilhaRotulos.push(rotuloNovo)
  }

  acao30() {
    this.codigo.push(`brfalse ${this.criarRotulo()}`)
  }

  acao31() {
    const rotuloNovo = this.criarRotulo()
    this.pilhaRotulos.pop()
    this.codigo.push(`br ${rotuloNovo}`)
    this.codigo.push(`${this.pilhaRotulos.pop()}:`)
    this.pilhaRotulos.push(rotuloNovo)
  }

  acao32() {
    const rotulo = `r${this.rotuloAtual++}`
    this.pilhaRotulos.push(rotulo)
    this.codigo.push(`${rotulo}:`)
  }

  acao33() {
    const rotulo = `r${this.rotuloAtual++}`
    this.pilhaRotulos.push(rotulo)
    this.codigo.push(`brfalse ${rotulo}`)
  }

  acao34() {
    const rotuloNovo = this.pilhaRotulos.pop()
    const rotuloAntigo = this.pilhaRotulos.pop()
    this.codigo.push(`br ${rotuloAntigo}`)
    this.codigo.push(`${rotuloNovo}:`)
  }

  acao35(token: Token) {
    const id = token.getLexeme()

    if (!(id in this.tabelaSimbolos)) {
      throw new SemanticError('identificador não declarado', this.getLine())
    }

    this.codigo.push(`ldloc ${id}`)

    const tipoIdTabela = this.tabelaSimbolos[id]

    this.pilhaTipos.push(tipoIdTabela)

    if (tipoIdTabela === 'int64') {
      this.codigo.push('conv.r8')
    }
  }

  acao36() {
    const tipoIdTabela = this.tabelaSimbolos[this.id]

    if (this.operadorAtribuicao === '-=') {
      this.codigo.push('sub')
    } else if (this.operadorAtribuicao === '+=') {
      this.codigo.push('add')
    }

    if (tipoIdTabela === 'int64') {
      this.codigo.push('conv.i8')
    }

    this.codigo.push(`stloc ${this.id}`)
  }

  criarRotulo() {
    const rotulo = `r${this.rotuloAtual++}`
    this.pilhaRotulos.push(rotulo)
    return rotulo
  }
}
