import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeReportUseCase } from '@/use_cases/factories/projects/make_make_report.js'

export async function makeReportProjects(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    try {
        const makeReport = makeReportUseCase()
        const { reports }  = await makeReport.execute()
        return reply.status(200).send(reports)
    } catch (error) {
        throw error
    }
}
