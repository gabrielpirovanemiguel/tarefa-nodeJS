import type { Prisma, Task } from "@/@types/prisma/client.js";

export interface TasksRepository {
    createTask(data: Prisma.TaskCreateInput): Promise<Task>
}