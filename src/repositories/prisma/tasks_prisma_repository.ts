import type { Prisma } from "@/@types/prisma/client.js";
import type { TasksRepository } from "../tasks_repository.js";
import { prisma } from "@/libs/prisma.js";


export class PrismaTasksRepository implements TasksRepository {
    async createTask(data: Prisma.TaskCreateInput) {
        return await prisma.task.create({ data })
    }
}