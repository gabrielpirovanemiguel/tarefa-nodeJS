import { PostsMockRepository } from '@/repositories/mock-posts/post-mock-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/users-prisma-repository.js'
import { GetUsersTopPostsLast24UseCase } from '@/use-cases/posts/get-users-top-posts-last24.js'

export function makeGetUsersTopPostsLast24() {
  const usersRepository = new PrismaUsersRepository()
  const postsRepository = new PostsMockRepository()
  const getTopPostsLast24UseCase = new GetUsersTopPostsLast24UseCase(
    postsRepository,
    usersRepository,
  )
  return getTopPostsLast24UseCase
}
