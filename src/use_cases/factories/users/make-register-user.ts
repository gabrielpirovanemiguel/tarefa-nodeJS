import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { RegisterUserUseCase } from '@/use_cases/users/register-user.js'

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUserUseCase(usersRepository)

  return registerUseCase
}
