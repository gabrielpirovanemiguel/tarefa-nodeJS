import type { PRIORITY, Prisma, TASK_FIELDS } from "@/@types/prisma/client.js";

export interface ListTaskQuery {
    completed?: boolean
    priority?: PRIORITY
    sort?: TASK_FIELDS
    order?: string
}


export const taskWithUsersInclude = {
    taskUser: {
        include: {
            user: {
                select: {
                    id: true,
                    publicId: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    },
    project: {
        select: { publicId: true }
    }
} satisfies Prisma.TaskInclude

export type TaskWithUsers = Prisma.TaskGetPayload<{ include: typeof taskWithUsersInclude }>
export interface TasksRepository {
    createTask(data: Prisma.TaskUncheckedCreateInput): Promise<TaskWithUsers>
    countByProjectId(projectId: number): Promise<number>
    getTaskByPublicId(publicId: string): Promise<TaskWithUsers | null>
    getIdByPublicId(publicId: string): Promise<{id: number} | null>
    findUserInTask(publicIdUser: string, publicIdTask: string): Promise<boolean>
    list(query: ListTaskQuery): Promise<TaskWithUsers[]>
    updateTask(publicId: string, data: Prisma.TaskUncheckedUpdateInput): Promise<TaskWithUsers>
    deleteTask(publicId: string): Promise<void>
    markTaskAsCompleted(publicId: string): Promise<TaskWithUsers>
}
