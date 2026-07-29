import { verifyJwt } from '@/http/middlewares/verify_jwt.js'
import type { FastifyInstance } from 'fastify'
import { registerProject } from './register_project_controller.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify_user_id_or_role.js'
import { USER_ROLE } from '@/@types/prisma/enums.js'
import { listProjects } from './list_projects_controller.js'
import { getProjectById } from './get_project_by_id_controller.js'
import { updateProject } from './update_project_controller.js'

export function projectsRoutes(app: FastifyInstance) {
    app.post(
        '/',
        { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
        registerProject,
    )
    app.get('/', { onRequest: [verifyJwt] }, listProjects)
    app.get('/:publicId', { onRequest: [verifyJwt] }, getProjectById)
    app.put(
        '/:publicId',
        { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
        updateProject
    )
}
