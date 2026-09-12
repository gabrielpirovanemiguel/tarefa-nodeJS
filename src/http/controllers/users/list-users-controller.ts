import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@/http/presenters/users-presenter.js'
import { makeListUsersUseCase } from '@/use_cases/factories/users/make-list-users.js'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  const listUsers = makeListUsersUseCase()
  const { users } = await listUsers.execute()

  return reply.status(200).send(UserPresenter.toHTTP(users))
}
