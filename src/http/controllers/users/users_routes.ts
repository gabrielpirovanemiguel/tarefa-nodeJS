import type { FastifyInstance } from 'fastify'
import { register } from './register_controller.js'
import { authenticate } from './auth_controler.js'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/register', register)
    app.post('/authenticate', authenticate)
}