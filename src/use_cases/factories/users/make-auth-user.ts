import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthUserUseCase } from '@/use_cases/users/auth-users.js'

export function makeAuthUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authUserUseCase = new AuthUserUseCase(usersRepository)

  return authUserUseCase
}
