import { ScannerConstants } from './ScannerConstants';
import { LexicalError } from './LexicalError';
import { Constants } from './Constants';
import { Token } from './Token';

export class Lexical implements Constants {
    private input: string;
    private position: number;

    constructor(input: string) {
        this.input = input;
        this.position = 0;
    }

    setPosition(position: number): void {
        this.position = position;
    }

    setInput(input: string): void {
        this.input = input;
        this.setPosition(0);
    }

    hasInput(): boolean {
        return this.position < this.input.length;
    }

    nextState(c: number, state: number): number {
        let start = ScannerConstants.SCANNER_TABLE_INDEXES[state];
        let end = ScannerConstants.SCANNER_TABLE_INDEXES[state + 1] - 1;

        while (start <= end) {
            let half = Math.trunc((start + end) / 2);

            if (ScannerConstants.SCANNER_TABLE[half][0] == c) {
                return ScannerConstants.SCANNER_TABLE[half][1];
            }
            else if (ScannerConstants.SCANNER_TABLE[half][0] < c) {
                start = half + 1;
            }
            else {
                end = half - 1;
            }
        }

        return -1;
    }

    nextChar(): number {
        if (this.hasInput())
            return this.input.charCodeAt(this.position++);
        else
            return -1;
    }

    tokenForState(state: number): number {
        if (state < 0 || state >= ScannerConstants.TOKEN_STATE.length) {
            return -1;
        }
        return ScannerConstants.TOKEN_STATE[state];
    }

    lookupToken(base: number, key: string): number {
        let start = ScannerConstants.SPECIAL_CASES_INDEXES[base];
        let end = ScannerConstants.SPECIAL_CASES_INDEXES[base + 1] - 1;

        while (start <= end) {
            let half = Math.trunc((start + end) / 2);
            const halfChar = ScannerConstants.SPECIAL_CASES_KEYS[half];

            if (halfChar === key)
                return ScannerConstants.SPECIAL_CASES_VALUES[half];
            else if (halfChar < key)
                start = half + 1;
            else
                end = half - 1;
        }

        return base;
    }

    nextToken(): Token | null {
        if (!this.hasInput()) {
            return null;
        }

        let start = this.position;
        let state = 0;
        let lastState = 0;
        let endState = -1;
        let end = -1;

        while (this.hasInput()) {
            lastState = state;
            const nextChar = this.nextChar()

            console.log(nextChar, String.fromCharCode(nextChar))

            state = this.nextState(nextChar, state); //q

            console.log('state', state)

            if (state < 0) {
                break
            }

            if (this.tokenForState(state) >= 0) {
                endState = state;
                end = this.position;
            }
        }

        if (endState < 0 || (endState != state && this.tokenForState(lastState) == -2)) {
            let parcial = this.input.substring(0, start);
            let linhaAtual = (parcial.length - parcial.replace('\n', "").length + 1);
            console.log(parcial, linhaAtual);

            throw new LexicalError(ScannerConstants.SCANNER_ERROR[lastState], linhaAtual);
        }

        this.position = end;

        let token = this.tokenForState(endState);

        if (token == 0)
            return this.nextToken();
        else {
            let lexeme = this.input.substring(start, end);
            token = this.lookupToken(token, lexeme);
            return new Token(token, lexeme, start);
        }
    }
}