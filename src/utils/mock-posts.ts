export interface Post {
  id: number
  publicId: string
  authordId: number
  content: string
  likes: number
  createdAt: Date
  updatedAt: Date
}

export const mockPosts: Post[] = [
  {
    id: 1,
    publicId: '01a0b63e-d0e7-7040-8058-fedda3c066c5',
    authordId: 2,
    content: 'teste',
    likes: 43,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    publicId: '01a0b640-8282-7706-81d4-eb8eb71d36ad',
    authordId: 2,
    content: 'testando outro',
    likes: 670,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    publicId: '01a0b641-34c7-77fe-ab5d-5f907e10d0a8',
    authordId: 2,
    content: 'testando outro 2',
    likes: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    publicId: '01a0b642-be41-744d-b4e3-f99eaf358877',
    authordId: 2,
    content: 'testando outro 3',
    likes: 6000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    publicId: '01a0b643-1c94-750a-af83-0bbea359da89',
    authordId: 2,
    content: 'testando outro 4',
    likes: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
