import type { User } from '@/@types/prisma/client.js'
import { env } from '@/env/index.js'
import { hash } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users_repository.js'
import { UserNotFound } from '../errors/user_not_found.js'

export interface UpdateUserUseCaseRequest {
    publicId: string
    name?: string
    password?: string
}

type UpdateUserUseCaseResponse = {
    user: User
}

export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
        publicId,
        name,
        password,
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        try {
            const userToUpdate =
                await this.usersRepository.getUserById(publicId)
            if (!userToUpdate) throw new UserNotFound()

            let passwordHash
            if (password)
                passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

            const user = await this.usersRepository.updateUser(
                userToUpdate.publicId,
                { name, passwordHash },
            )

            return { user }
        } catch (error) {
            throw error
        }
    }
}
