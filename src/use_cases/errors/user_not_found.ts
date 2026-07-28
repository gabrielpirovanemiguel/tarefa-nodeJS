export class UserNotFound extends Error {
    constructor() {
        super('Não foi encontrado nenhum usuário com esse ID.')
    }
}
