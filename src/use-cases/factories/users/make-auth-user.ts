import { compare } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { AuthUserUseCase, type TokenProvider } from '@/use-cases/users/auth-users.js'

export function makeAuthUserUseCase(tokenProvider: TokenProvider) {
  const userRepository = new PrismaUsersRepository()
  const authUserUseCase = new AuthUserUseCase(userRepository, { compare }, tokenProvider)
  return authUserUseCase
}