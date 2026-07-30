import type { FastifyInstance } from 'fastify'
import { register } from './register_controller.js'
import { authenticate } from './auth_controller.js'
import { listUsers } from './list_users_controller.js'
import { verifyJwt } from '@/http/middlewares/verify_jwt.js'
import { getUserById } from './get_by_id_controller.js'
import { updateUser } from './update_controller.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify_user_id_or_role.js'
import { deleteUser } from './delete_users.js'
import { verifyRole } from '@/http/middlewares/verify_role.js'
import { USER_ROLE } from '@/@types/prisma/enums.js'

export async function usersRoutes(app: FastifyInstance) {
    app.get('', { onRequest: [verifyJwt] }, listUsers)
    app.get('/:publicId', { onRequest: [verifyJwt] }, getUserById)
    app.put(
        '/:publicId',
        { onRequest: [verifyJwt, verifyUserIdOrRole([USER_ROLE.admin])] },
        updateUser,
    )
    app.delete(
        '/:publicId',
        { onRequest: [verifyJwt, verifyRole([USER_ROLE.admin])] },
        deleteUser,
    )
}
