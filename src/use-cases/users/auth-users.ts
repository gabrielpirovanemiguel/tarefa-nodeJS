import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error.js'

export interface HashProvider {
  compare(plain: string, hashed: string): Promise<boolean>
}

export interface TokenProvider {
  sign(payload: { sub: string; role: string }): Promise<string>
}

interface AuthUserUseCaseRequest {
  email: string
  password: string
}

type AuthUserUseCaseResponse = {
  user: User
  token: string
}

export class AuthUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider,
  ) {}

  async execute({ email, password }: AuthUserUseCaseRequest): Promise<AuthUserUseCaseResponse> {
    const user = await this.usersRepository.findUserByEmail(email)
    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatch = await this.hashProvider.compare(password, user.passwordHash)
    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    const token = await this.tokenProvider.sign({ sub: user.publicId, role: user.role })

    return { user, token }
  }
}