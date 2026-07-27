import type { User } from '@/@types/prisma/client.js'
import { compare } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users_repository.js'
import { InvalidCredentialsError } from '../errors/invalid_credentials_error.js'

interface AuthUserUseCaseRequest {
    email: string
    password: string
}

type AuthUserUseCaseResponse = {
    user: User
}

export class AuthUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        email,
        password
    }: AuthUserUseCaseRequest): Promise<AuthUserUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email)
        if (!user) throw new InvalidCredentialsError()

        const doesPasswordMatch = await compare(password, user.passwordHash)

        if (!doesPasswordMatch) throw new InvalidCredentialsError()

        return { user }

    }
}