import { PrismaProjectsRepository } from '@/repositories/prisma/projects_prisma_repository.js'
import { MakeReportUseCase } from '@/use_cases/projects/make_report.js'

export function makeReportUseCase() {
    const ProjectsRepository = new PrismaProjectsRepository()
    const makeReportUseCase = new MakeReportUseCase(ProjectsRepository)
    return makeReportUseCase
}
