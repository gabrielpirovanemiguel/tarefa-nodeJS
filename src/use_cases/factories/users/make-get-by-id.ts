import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetByIdUseCase } from '@/use_cases/users/get-user-by-id.js'

export function makeGetUserByIdUseCase() {
  const userRepository = new PrismaUsersRepository()
  const getUserByIdUseCase = new GetByIdUseCase(userRepository)
  return getUserByIdUseCase
}
