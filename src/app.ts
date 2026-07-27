import Fastify from 'fastify'

export const app = Fastify({ logger: true })

app.get('/health', async (request, reply) => {
  return reply.status(200).send({ status: 'ok' })
})
