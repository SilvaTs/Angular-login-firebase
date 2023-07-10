import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code: string) {
    switch (code) {

      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'O usuário já existe';

      case FirebaseCodeErrorEnum.WeakPassword:
        return 'A senha é muito fraca';

      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'email inválido';

      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Senha incorreta';

      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Usuário não existe';
      default:
        return 'Error desconhecido';
    }
  }
}
