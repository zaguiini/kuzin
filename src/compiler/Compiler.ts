import { Lexical } from './Lexical'
import { Semantico } from './Semantic'
import { Stack } from './Stack'
import { Sintatico } from './Syntactic'

export class Compiler {
  input: string
  nome: string


  constructor(input: string, nome: string) {
    this.input = input.replace(/\r\n/g, '\n')
    this.nome = nome
  }

  compile() {
    return new Promise<string>((resolve, reject) => {
      const pilha = new Stack<number>()

      const lexico = new Lexical(this.input)
      const semantico = new Semantico()
      const sintatico = new Sintatico(pilha, null, null, lexico, semantico)
      try {
        resolve(sintatico.parse(this.nome))
      } catch (e) {
        reject(e)
      }
    })
  }
}
