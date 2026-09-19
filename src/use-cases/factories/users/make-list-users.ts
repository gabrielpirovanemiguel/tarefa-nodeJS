import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ListUsersUseCase } from '@/use-cases/users/list-users.js'

export function makeListUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const listUsersUseCase = new ListUsersUseCase(usersRepository)
  return listUsersUseCase
}
