import type { FastifyInstance } from 'fastify'
import { listUsers } from './list_users_controller.js'
import { verifyJwt } from '@/http/middlewares/verify_jwt.js'
import { getUserById } from './get_by_id_controller.js'
import { updateUser } from './update_controller.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify_user_id_or_role.js'
import { deleteUser } from './delete_users.js'
import { verifyRole } from '@/http/middlewares/verify_role.js'
import { USER_ROLE } from '@/@types/prisma/enums.js'
import { getTasksWithUser } from './get_tasks_with_user_controller.js'

export async function usersRoutes(app: FastifyInstance) {
    app.get('', { onRequest: [verifyJwt] }, listUsers)
    app.get('/:publicIdUser', { onRequest: [verifyJwt] }, getUserById)
    app.get('/:publicIdUser/tasks', { onRequest: [verifyJwt] }, getTasksWithUser)
    app.put(
        '/:publicIdUser',
        { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
        updateUser,
    )
    app.delete(
        '/:publicIdUser',
        { onRequest: [verifyJwt, verifyRole([USER_ROLE.admin])] },
        deleteUser,
    )
}
