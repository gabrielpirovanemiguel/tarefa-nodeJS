import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
// import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'
import { makeRegisterUserUseCase } from '@/use_cases/factories/make_register_user.js'
// import { UserPresenter } from '@/http/presenters/users-presenter.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().trim().min(1).max(100),
        email: z.email().trim().min(1).max(100),
        password: z.string().trim().min(8).max(100),
    })

    const { name, email, password } = registerBodySchema.parse(
        request.body,
    )

    const registerUseCase = makeRegisterUserUseCase()
    const { user } = await registerUseCase.execute({
        name,
        email,
        password,
    })

    return reply.status(201).send({ user })
}
