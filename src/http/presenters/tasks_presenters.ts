import type { PRIORITY, PRIORITY, Project, STATUS } from '@/@types/prisma/client.js'

type HTTPTask = {
    id: string
    title: string
    description: string | null
    deadline: Date | null
    project: number
    priority: PRIORITY
    completed: boolean
    createdAt: Date
    updatedAt: Date
}

export class TaskPresenter {
    static toHTTP(project: Project): HTTPProject
    static toHTTP(projects: Project[]): HTTPProject[]
    static toHTTP(input: Project | Project[]): HTTPProject | HTTPProject[] {
        if (Array.isArray(input)) {
            return input.map((p) => this.toHTTP(p))
        }

        return {
            id: input.publicId,
            name: input.name,
            description: input.description,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        }
    }
}
