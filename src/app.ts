import Fastify from 'fastify'
import { appRoutes } from './http/routes.js'

export const app = Fastify({ logger: true })

app.get('/health', async (request, reply) => {
  return reply.status(200).send({ status: 'ok' })
})

app.register(appRoutes)