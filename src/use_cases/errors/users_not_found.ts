export class UsersNotFound extends Error {
    constructor() {
        super('Algum dos usuários não foi encontrado.')
    }
}
