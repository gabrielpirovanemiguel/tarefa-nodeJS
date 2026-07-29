export class ProjectNotFound extends Error {
    constructor() {
        super('Não foi encontrado nenhum projeto com esse ID.')
    }
}
