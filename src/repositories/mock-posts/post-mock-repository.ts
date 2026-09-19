import type { PostsRepository } from '../post-repository.js'
import { mockPosts } from '@/utils/mock-posts.js'

export class PostsMockRepository implements PostsRepository {
  listPostsInPeriod(maxTime: Date) {
    const userPosts = mockPosts.filter((post) => post.updatedAt >= maxTime)
    return userPosts
  }
}
