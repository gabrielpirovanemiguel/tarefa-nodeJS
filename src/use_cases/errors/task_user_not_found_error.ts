
export class TaskUserNotFound extends Error {
    constructor() {
        super('O usuário dado não está atribuído a essa tarefa.')
    }

}