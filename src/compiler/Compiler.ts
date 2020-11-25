import { Lexical } from './Lexical'
import { Semantico } from './Semantic'
import { Stack } from './Stack'
import { Sintatico } from './Syntactic'

export class Compiler {
  input: string

  constructor(input: string) {
    this.input = input.replace(/\r\n/g, '\n')
  }

  compile() {
    return new Promise<string>((resolve, reject) => {
      const pilha = new Stack<number>()

      const lexico = new Lexical(this.input)
      const semantico = new Semantico()
      const sintatico = new Sintatico(pilha, null, null, lexico, semantico)
      try {
        resolve(sintatico.parse())
      } catch (e) {
        reject(e)
      }
    })
  }
}
