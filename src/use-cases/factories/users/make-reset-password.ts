import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { ResetPasswordUseCase } from '@/use-cases/users/reset-password.js'

export function makeResetPasswordUseCase() {
  const userRepository = new PrismaUsersRepository()
  const resetPasswordUseCase = new ResetPasswordUseCase(userRepository)
  return resetPasswordUseCase
}
