import { Lexical } from './Lexical'
import { Semantico } from './Semantic'
import { Stack } from './Stack'
import { Sintatico } from './Syntatic'

export class Compiler {
  input: string

  constructor(input: string) {
    this.input = input.replace(/\r\n/g, '\n')
  }

  compile() {
    return new Promise<void>((resolve, reject) => {
      const pilha = new Stack<number>()

      const lexico = new Lexical(this.input)
      const semantico = new Semantico()
      const sintatico = new Sintatico(pilha, null, null, lexico, semantico)
      try {
        sintatico.parse()
        resolve()
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }
}
