import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeReportUseCase } from '@/use_cases/factories/projects/make-make-report.js'

export async function makeReportProjects(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const makeReport = makeReportUseCase()
  const { reports } = await makeReport.execute()
  return reply.status(200).send(reports)
}
