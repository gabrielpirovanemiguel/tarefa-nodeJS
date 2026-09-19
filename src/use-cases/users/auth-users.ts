import { compare } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'

interface AuthUserUseCaseRequest {
  email: string
  password: string
}

type AuthUserUseCaseResponse = {
  user: User
}

export class AuthUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthUserUseCaseRequest): Promise<AuthUserUseCaseResponse> {
    const user = await this.usersRepository.findUserByEmail(email)
    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    return { user }
  }
}
