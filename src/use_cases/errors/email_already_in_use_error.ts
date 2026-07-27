export class EmailAlreadyInUse extends Error {
  constructor() {
    super('O e-mail inserido já está em uso.')
  }
}