export class ProjectHasAssociatedTasksError extends Error {
    constructor() {
        super('Impossível excluir projeto, pois ele possui tarefas associadas.')
    }
}
