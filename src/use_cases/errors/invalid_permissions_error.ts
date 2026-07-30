export class InvalidPermissions extends Error {
    constructor() {
        super('Você não tem permissão para fazer essa ação.')
    }
}
