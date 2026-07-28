import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUsersUseCase } from '@/use_cases/factories/make_list_users.js'
import { UserPresenter } from '@/http/presenters/users_presenter.js'


export async function list_users(request: FastifyRequest, reply: FastifyReply) {
    try {
        const listUsers = makeListUsersUseCase()
        const { users } = await listUsers.execute()

        return reply.status(201).send({ users: UserPresenter.toHTTP(users) })
    } catch (error) {
        throw error
    }
}
