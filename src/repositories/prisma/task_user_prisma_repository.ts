import { prisma } from "@/libs/prisma.js";
import type { TaskUserRepository } from "../task_user_repository.js";


export class PrismaTaskUserRepository implements TaskUserRepository {
    async createTaskUser(idTask: number, idUsers: number[]) {
        await prisma.taskUser.createMany({
            data: idUsers.map((userId) => ({ taskId: idTask, userId })),
            skipDuplicates: true,
        })
    }

    async deleteTaskUser(idTask: number, idUser: number) {
        await prisma.taskUser.delete({
            where: {
                taskId_userId: {
                    taskId: idTask,
                    userId: idUser,
                },
            },
        })
    }

    async findTaskUser(idTask: number, idUser: number) {
        return await prisma.taskUser.findUnique({
            where: {
                taskId_userId: { taskId: idTask, userId: idUser },
            },
        })
    }

    async findTaskUserByUserId(idUser: number) {
        return await prisma.taskUser.findMany({
            where: { userId: idUser }
        })
    }

}