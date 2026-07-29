import type { Prisma } from "@/@types/prisma/client.js";


export const taskWithUsersInclude = {
    taskUser: {
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    }
} satisfies Prisma.TaskInclude

export type TaskWithUsers = Prisma.TaskGetPayload<{ include: typeof taskWithUsersInclude }>
export interface TasksRepository {
    createTask(data: Prisma.TaskUncheckedCreateInput): Promise<TaskWithUsers>
    countByProjectId(projectId: number): Promise<number>
    getTaskById(publicId: string): Promise<TaskWithUsers | null>
}
