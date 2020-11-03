import { Token } from "./Token";

export class Semantico {
    executeAction(action: number, token: Token) {
        console.log("Ação #" + action + ", Token: " + token);
    }
}
