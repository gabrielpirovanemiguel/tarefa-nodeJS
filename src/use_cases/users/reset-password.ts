import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidTokenError } from '../errors/invalid-token-error.js'
import { UserNotFoundByToken } from '../errors/user-not-found-by-toker.js'

interface ResetPasswordUseCaseRequest {
  token: string
  password: string
}

interface ResetPasswordUseCaseResponse {
  user: User
}

export class ResetPasswordUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute({
    token,
    password,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const doesUserExists = await this.userRepository.findUserByToken(token)
    if (!doesUserExists) throw new UserNotFoundByToken()
    if (
      !doesUserExists.tokenExpiresAt ||
      doesUserExists.tokenExpiresAt < new Date()
    )
      throw new InvalidTokenError()
    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)
    const user = await this.userRepository.updateUser(doesUserExists.publicId, {
      passwordHash,
    })
    await this.userRepository.updateUser(doesUserExists.publicId, {
      tokenExpiresAt: new Date(),
    })
    return { user }
  }
}
