import { Token } from "./Token";

export class Semantico {
    executeAction(action: number, token: (Token | null)) {
        console.log("Ação #" + action + ", Token: " + token);
    }
}
