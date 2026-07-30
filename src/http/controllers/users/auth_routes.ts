import type { FastifyInstance } from 'fastify'
import { register } from './register_controller.js'
import { authenticate } from './auth_controller.js'

export async function authRoutes(app: FastifyInstance) {
    app.post('/register', register)
    app.post('/login', authenticate)
}
