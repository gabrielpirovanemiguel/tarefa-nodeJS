import type { TaskUser } from "@/@types/prisma/client.js";



export interface TaskUserRepository {
    createTaskUser(idTask: number, idUsers: number[]): Promise<void>
}