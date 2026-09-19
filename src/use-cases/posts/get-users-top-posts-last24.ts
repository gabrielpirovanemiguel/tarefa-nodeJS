import type { PostsMockRepository } from '@/repositories/mock-posts/post-mock-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import type { User } from '@/@types/prisma/client.js'

interface GetUsersTopPostsLast24UseCaseResponse {
  users: User[]
}

export class GetUsersTopPostsLast24UseCase {
  constructor(
    private postsRepository: PostsMockRepository,
    private usersRespository: UsersRepository,
  ) {}
  async execute(): Promise<GetUsersTopPostsLast24UseCaseResponse> {
    try {
      const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const posts = this.postsRepository.listPostsInPeriod(last24Hours)
      posts.sort((a, b) => {
        return b.likes - a.likes
      })
      const allUsersId = posts.map((post) => post.authordId)
      const usersId = [...new Set(allUsersId)]
      const users = await Promise.all(
        usersId.map((id) => this.usersRespository.getUserById(id)),
      )
      const validUsers = users.filter(
        (user): user is User => user !== null && user !== undefined,
      )
      return { users: validUsers }
    } catch (error) {
      throw error
    }
  }
}
