import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserNotFound } from '../errors/user-not-found.js'
import { randomBytes } from 'node:crypto'

interface ForgotPasswordUseCaseRequest {
  email: string
}

interface ForgotPasswordUseCaseResponse {
  user: User
  token: string
}

const TOKEN_LENGTH = 32
const EXPIRES_IN_MINUTES = 15

export class ForgotPasswordUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute({
    email,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const doUserExist = await this.userRepository.findUserByEmail(email)
    if (!doUserExist) throw new UserNotFound()
    const token = randomBytes(TOKEN_LENGTH).toString('hex')
    const tokenExpiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000)
    const user = await this.userRepository.updateUser(doUserExist.publicId, {
      token,
      tokenExpiresAt,
    })
    return { user, token }
  }
}
