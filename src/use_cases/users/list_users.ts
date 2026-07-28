import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users_repository.js'

type ListUsersUseCaseResponse = {
    users: User[]
}

export class ListUsersUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute(): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersRepository.list()
        return { users }
    }
}