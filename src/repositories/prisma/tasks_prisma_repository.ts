import type { Prisma } from "@/@types/prisma/client.js";
import { taskWithUsersInclude, type TasksRepository } from "../tasks_repository.js";
import { prisma } from "@/libs/prisma.js";


export class PrismaTasksRepository implements TasksRepository {
    async createTask(data: Prisma.TaskUncheckedCreateInput){
        return await prisma.task.create({
            data,
            include: taskWithUsersInclude
        })
    }
}