import type { FastifyInstance } from 'fastify'
import { register } from './register_controller.js'
import { authenticate } from './auth_controller.js'
import { listUsers } from './list_users_controller.js'
import { verifyJwt } from '@/http/middlewares/verify_jwt.js'
import { getUserById } from './get_by_id_controller.js'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/register', register)
    app.post('/authenticate', authenticate)
    app.get('/', { onRequest: [verifyJwt] }, listUsers)
    app.get('/:publicId', { onRequest: [verifyJwt] }, getUserById)
}
