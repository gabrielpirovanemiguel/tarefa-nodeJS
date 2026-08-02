import type { User } from '@/@types/prisma/client.js'
import { USER_ROLE } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import { hash } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users_repository.js'
import { EmailAlreadyInUse } from '../errors/email_already_in_use_error.js'

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
        try {
            const userWithSameEmail =
                await this.usersRepository.findUserByEmail(email)

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
        } catch (error) {
            throw error
        }
    }
}
