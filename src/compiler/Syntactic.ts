import { Lexical } from './Lexical'
import { Semantico } from './Semantic'
import { Token } from './Token'
import { Stack } from './Stack'
import { ParserConstants } from './ParserConstants'
import { Constants } from './Constants'
import { SyntacticError } from './SyntacticError'

export class Sintatico {
  private stack: Stack<number>
  private currentToken: Token | null
  private previousToken: Token | null
  private scanner: Lexical
  private semanticAnalyser: Semantico

  constructor(
    stack: Stack<number>,
    currentToken: Token | null,
    previousToken: Token | null,
    scanner: Lexical,
    semanticAnalyser: Semantico
  ) {
    this.stack = stack
    this.currentToken = currentToken
    this.previousToken = previousToken
    this.scanner = scanner
    this.semanticAnalyser = semanticAnalyser
  }

  isTerminal(x: number): boolean {
    return x < ParserConstants.FIRST_NON_TERMINAL
  }

  isNonTerminal(x: number): boolean {
    return (
      x >= ParserConstants.FIRST_NON_TERMINAL &&
      x < ParserConstants.FIRST_SEMANTIC_ACTION
    )
  }

  isSemanticAction(x: number): boolean {
    return x >= ParserConstants.FIRST_SEMANTIC_ACTION
  }

  step() {
    if (this.currentToken == null) {
      let pos = 0
      if (this.previousToken != null)
        pos =
          this.previousToken.getPosition() +
          this.previousToken.getLexeme().length

      this.currentToken = new Token(Constants.DOLLAR, 'EOF', pos)
    }

    const x = this.stack.pop()
    const a = this.currentToken.getId()

    if (x == Constants.EPSILON) {
      return false
    } else if (this.isTerminal(x)) {
      if (x == a) {
        if (this.stack.empty()) return true
        else {
          this.previousToken = this.currentToken
          this.currentToken = this.scanner.nextToken()
          return false
        }
      } else {
        throw new SyntacticError(
          this.scanner.getLine(),
          `encontrado ${this.currentToken.getLexeme()}`,
          ParserConstants.PARSER_ERROR[x]
        )
      }
    } else if (this.isNonTerminal(x)) {
      if (this.pushProduction(x, a)) return false
      else
        throw new SyntacticError(
          this.scanner.getLine(),
          `encontrado ${this.currentToken.getLexeme()}`,
          ParserConstants.PARSER_ERROR[x]
        )
    } // isSemanticAction(x)
    else {
      this.semanticAnalyser.executeAction(
        x - ParserConstants.FIRST_SEMANTIC_ACTION,
        this.previousToken
      )
      return false
    }
  }

  pushProduction(topStack: number, tokenInput: number): boolean {
    const p: number =
      ParserConstants.PARSER_TABLE[
        topStack - ParserConstants.FIRST_NON_TERMINAL
      ][tokenInput - 1]
    if (p >= 0) {
      const production: number[] = ParserConstants.PRODUCTIONS[p]
      //empilha a produção em ordem reversa
      for (let i: number = production.length - 1; i >= 0; i--) {
        this.stack.push(production[i])
      }
      return true
    } else {
      return false
    }
  }

  parse(nome: string) {
    this.stack.clear()
    this.stack.push(Constants.DOLLAR)
    this.stack.push(ParserConstants.START_SYMBOL)
    this.currentToken = this.scanner.nextToken()
    this.semanticAnalyser.setup()

    const comeco = `.assembly extern mscorlib {}
.assembly _${nome}{}
.module _${nome}.exe

.class public _UNICA{

.method static public void _principal() {
`

    const fim = `
}
}
`
    while (!this.step());
    return (
      comeco +
      this.semanticAnalyser
        .getCodigo()
        .map((instrucao) => `  ${instrucao}`)
        .join(`\r\n`) +
      fim
    )
  }
}
