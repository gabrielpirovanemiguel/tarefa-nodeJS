import { PrismaProjectsRepository } from '@/repositories/prisma/projects-prisma-repository.js'
import { MakeReportUseCase } from '@/use_cases/projects/make-report.js'

export function makeReportUseCase() {
  const ProjectsRepository = new PrismaProjectsRepository()
  const makeReportUseCase = new MakeReportUseCase(ProjectsRepository)
  return makeReportUseCase
}
