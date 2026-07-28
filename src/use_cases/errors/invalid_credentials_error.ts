export class InvalidCredentialsError extends Error {
    constructor() {
        super('Senha ou e-mail incorretos.')
    }
}
