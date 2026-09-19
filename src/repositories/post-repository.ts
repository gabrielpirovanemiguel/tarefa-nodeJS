import type { Post } from '@/utils/mock-posts.js'

export interface PostsRepository {
  listPostsInPeriod(maxTime: Date): Post[]
}
