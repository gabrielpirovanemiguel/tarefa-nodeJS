import fastifyJwt from '@fastify/jwt'
import Fastify from 'fastify'
import z, { ZodError } from 'zod'
import { env } from './env/index.js'
import { appRoutes } from './http/routes.js'

export const app = Fastify({ logger: true })

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.get('/health', async (_request, reply) => {
  return reply.status(200).send({ status: 'ok' })
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: z.prettifyError(error).replace('\n ', '') })
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message:
        'O corpo da requisição não está em formato JSON válido. Verifique a estrutura dos dados enviados.',
    })
  }

  return reply
    .status(500)
    .send({ message: `Erro interno do servidor! ${(error as Error).message}` })
})
