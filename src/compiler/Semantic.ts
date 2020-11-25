import { Token } from './Token'

export class Semantico {
  executeAction(action: number, token: Token | null) {
    return 'Ação #' + action + ', Token: ' + token
  }
}
