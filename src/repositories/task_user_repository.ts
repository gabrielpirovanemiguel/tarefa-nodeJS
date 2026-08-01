import type { TaskUser } from "@/@types/prisma/browser.js"



export interface TaskUserRepository {
    createTaskUser(idTask: number, idUsers: number[]): Promise<void>
    deleteTaskUser(idTask: number, idUser: number): Promise<void>
    findTaskUser(idTask: number, idUser: number): Promise<TaskUser | null>
    findTaskUserByUserId(idUser: number): Promise<TaskUser[] | null>
}