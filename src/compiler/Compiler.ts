import { Lexical } from './Lexical'
import { Token } from './Token'

export class Compiler {
    input: string

    constructor(input: string) {
        // TODO: ERRO TA AQUI
        this.input = input.replace(/\n/, '\n')
    }

    compile() {
        return new Promise<Token[]>((resolve, reject) => {
            const tokens = []

            const lexico = new Lexical(this.input)

            try {
                let token = lexico.nextToken()

                while (token != null) {
                    const parcial = this.input.substring(0, token.getPosition())
                    const linhaAtual = (parcial.length - parcial.replace('\n', "").length) + 1
                    token.setLine(linhaAtual)
                    tokens.push(token)

                    token = lexico.nextToken()
                }
            } catch (e) {
                return reject(e);
            }
            resolve(tokens)
        })
    }
}