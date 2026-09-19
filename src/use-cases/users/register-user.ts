import { hash } from 'bcryptjs'
import type { USER_ROLE, User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { EmailAlreadyInUse } from '../errors/email-already-in-use-error.js'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  role: USER_ROLE
}

type RegisterUserUseCaseResponse = {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyInUse()
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const user = await this.usersRepository.createUser({
      email,
      name,
      passwordHash,
      role,
    })

    return { user }
  }
}
