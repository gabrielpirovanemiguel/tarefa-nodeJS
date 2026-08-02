import { verifyJwt } from '@/http/middlewares/verify_jwt.js'
import type { FastifyInstance } from 'fastify'
import { makeReportProjects } from './make_report_projects_controller.js'

export function reportsRoutes(app: FastifyInstance) {
    app.get('/projects', { onRequest: [verifyJwt] }, makeReportProjects)
}
