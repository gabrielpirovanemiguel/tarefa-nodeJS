import type { FastifyInstance } from 'fastify'
import { authenticate } from './auth-controller.js'
import { register } from './register-controller.js'

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', authenticate)
}
