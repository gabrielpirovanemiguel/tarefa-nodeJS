import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user.js'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const delteUserUseCase = new DeleteUserUseCase(usersRepository)

  return delteUserUseCase
}
