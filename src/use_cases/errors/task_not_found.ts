export class TaskNotFound extends Error {
    constructor() {
        super('Não foi encontrada nenhuma tarefa com esse ID.')
    }
}
