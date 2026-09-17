import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ForgotPasswordUseCase } from '@/use_cases/users/forgot-password.js'

export function makeForgotPasswordUseCase() {
  const userRepository = new PrismaUsersRepository()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository)
  return forgotPasswordUseCase
}
