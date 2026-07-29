import Fastify from 'fastify'
import { appRoutes } from './http/routes.js'
import z, { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/index.js'

export const app = Fastify({ logger: true })

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.get('/health', async (request, reply) => {
    return reply.status(200).send({ status: 'ok' })
})

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Dados de registro inválidos!',
            details: z.treeifyError(error),
        })
    }

    if (error instanceof SyntaxError) {
        return reply.status(400).send({
            message:
                'O corpo da requisição não está em formato JSON válido. Verifique a estrutura dos dados enviados.',
        })
    }

    return reply.status(500).send({ message: 'Erro interno do servidor!' + error.message })
})
