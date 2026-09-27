import { redis } from '@/libs/redis.js'
import type {
  ListTaskQuery,
  TasksRepository,
  TaskWithUsers,
} from '../tasks-repository.js'

const TASKS_LIST_CACHE_PREFIX = 'tasks:list:'
const TASKS_LIST_TTL_SECONDS = 60

export class CachedTasksRepository {
  constructor(private tasksRepository: TasksRepository) {}
  private buildListCacheKey(query: ListTaskQuery) {
    const { completed, priority, sort, order } = query
    return `${TASKS_LIST_CACHE_PREFIX}${completed}:${priority}:${sort}:${order}`
  }
  async list(query: ListTaskQuery): Promise<TaskWithUsers[]> {
    const cacheKey = this.buildListCacheKey(query)

    const cached = await redis.get(cacheKey)
    if (cached) return JSON.parse(cached) as TaskWithUsers[]

    const tasks = await this.tasksRepository.listTasks(query)
    await redis.set(
      cacheKey,
      JSON.stringify(tasks),
      'EX',
      TASKS_LIST_TTL_SECONDS,
    )

    return tasks
  }
}
