export class InvalidTokenError extends Error {
  constructor() {
    super('Link de troca de senha inválido..')
  }
}
