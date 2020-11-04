import { Lexical } from "./Lexical";
import { Semantico } from "./Semantic";
import { Token } from "./Token";
import { Stack } from './Stack';
import { ParserConstants } from './ParserConstants';
import { Constants } from './Constants'
import { SyntaticError } from './SyntaticError';

export class Sintatico {
    private stack: Stack;
    private currentToken: (Token | null);
    private previousToken: (Token | null);
    private scanner: Lexical;
    private semanticAnalyser: Semantico;

    constructor(stack: Stack, currentToken: (Token | null), previousToken: (Token | null), scanner: Lexical, semanticAnalyser: Semantico) {
        this.stack = stack;
        this.currentToken = currentToken;
        this.previousToken = previousToken;
        this.scanner = scanner;
        this.semanticAnalyser = semanticAnalyser;
    }

    isTerminal(x: number): boolean {
        return x < ParserConstants.FIRST_NON_TERMINAL;
    }

    isNonTerminal(x: number): boolean {
        return x >= ParserConstants.FIRST_NON_TERMINAL && x < ParserConstants.FIRST_SEMANTIC_ACTION;
    }

    isSemanticAction(x: number): boolean {
        return x >= ParserConstants.FIRST_SEMANTIC_ACTION;
    }

    step(): boolean {
        if (this.currentToken == null) {
            let pos = 0;
            if (this.previousToken != null)
                pos = this.previousToken.getPosition() + this.previousToken.getLexeme().length;

            this.currentToken = new Token(Constants.DOLLAR, "$", pos);
        }

        let x = this.stack.pop();
        let a = this.currentToken.getId();

        if (x == Constants.EPSILON) {
            return false;
        }
        else if (this.isTerminal(x)) {
            if (x == a) {
                if (this.stack.empty())
                    return true;
                else {
                    this.previousToken = this.currentToken;
                    this.currentToken = this.scanner.nextToken();
                    return false;
                }
            }
            else {
                throw new SyntaticError(ParserConstants.PARSER_ERROR[x], this.scanner.getLine());
            }
        }
        else if (this.isNonTerminal(x)) {
            if (this.pushProduction(x, a))
                return false;
            else
                throw new SyntaticError(ParserConstants.PARSER_ERROR[x], this.scanner.getLine());
        }
        else // isSemanticAction(x)
        {
            this.semanticAnalyser.executeAction(x - ParserConstants.FIRST_SEMANTIC_ACTION, this.previousToken);
            return false;
        }
    }

    pushProduction(topStack: number, tokenInput: number): boolean {
        let p: number = ParserConstants.PARSER_TABLE[topStack - ParserConstants.FIRST_NON_TERMINAL][tokenInput - 1];
        if (p >= 0) {
            let production: number[] = ParserConstants.PRODUCTIONS[p];
            //empilha a produção em ordem reversa
            for (let i: number = production.length - 1; i >= 0; i--) {
                this.stack.push(production[i]);
            }
            return true;
        }
        else {
            return false;
        }
    }

    parse() {
        this.stack.clear();
        this.stack.push(Constants.DOLLAR);
        this.stack.push(ParserConstants.START_SYMBOL);

        this.currentToken = this.scanner.nextToken();

        while (!this.step()) {
        };
    }
}
