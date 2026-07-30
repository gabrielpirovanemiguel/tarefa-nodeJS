import type { PRIORITY, Prisma, TASK_FIELDS } from "@/@types/prisma/client.js";

export interface ListTaskQuery {
    completed?: boolean
    priority?: PRIORITY
    sort?: TASK_FIELDS
    order?: string
    page: 1 | number
}

export interface ListTaskResponse {
    data: TaskWithUsers[]
    totalCount: number
    totalPages: number
    currentPage: number
}



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
    getTaskByPublicId(publicId: string): Promise<TaskWithUsers | null>
    list(query: ListTaskQuery): Promise<ListTaskResponse>
    updateTask(publicId: string, data: Prisma.TaskUncheckedUpdateInput): Promise<TaskWithUsers>
}
