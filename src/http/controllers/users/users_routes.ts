import type { FastifyInstance } from 'fastify'
import { register } from './register_controller.js'
import { authenticate } from './auth_controller.js'
import { listUsers } from './list_users_controller.js'
import { verifyJwt } from '@/http/middlewares/verify_jwt.js'
import { getUserById } from './get_by_id_controller.js'
import { updateUser } from './update_controller.js'
import { verifyUserIdOrRole } from '@/http/middlewares/verify_user_id_or_role.js'
import { deleteUser } from './delete_users.js'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/register', register)
    app.post('/authenticate', authenticate)
    app.get('/', { onRequest: [verifyJwt] }, listUsers)
    app.get('/:publicId', { onRequest: [verifyJwt] }, getUserById)
    app.put(
        '/update/:publicId',
        { onRequest: [verifyJwt, verifyUserIdOrRole(['admin'])] },
        updateUser,
    )
    app.delete(
        '/:publicId',
        { onRequest: [verifyJwt, verifyUserIdOrRole(['admin'])] },
        deleteUser,
    )
}
