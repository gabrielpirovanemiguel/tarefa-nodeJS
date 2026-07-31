import { prisma } from "@/libs/prisma.js";
import type { TaskUserRepository } from "../task_user_repository.js";


export class PrismaTaskUserRepository implements TaskUserRepository {
    async createTaskUser(idTask: number, idUsers: number[]) {
        await prisma.taskUser.createMany({
            data: idUsers.map((userId) => ({ taskId: idTask, userId })),
            skipDuplicates: true,
        })
    }
}