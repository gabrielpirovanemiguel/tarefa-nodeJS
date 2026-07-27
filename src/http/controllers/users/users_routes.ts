import type { FastifyInstance } from 'fastify'
import { register } from './register_controller.js'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/register', register)
}