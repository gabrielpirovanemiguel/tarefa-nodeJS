export class UserNotFoundByToken extends Error {
  constructor() {
    super('Link de recuperação de senha inválido.')
  }
}
