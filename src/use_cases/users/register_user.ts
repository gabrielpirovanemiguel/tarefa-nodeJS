import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import { hash } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users_repository.js'
// import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js'

interface RegisterUserUseCaseRequest {
    name: string
    email: string
    password: string
}

type RegisterUserUseCaseResponse = {
    user: User
}

export class RegisterUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        name,
        email,
        password
    }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
        const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

        const user = await this.usersRepository.create({
            email,
            name,
            passwordHash,
        })

        return{user} //TIRAR O HASH DEPOIS
    }
}