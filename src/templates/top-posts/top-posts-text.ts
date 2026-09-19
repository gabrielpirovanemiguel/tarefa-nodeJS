import { env } from '@/env/index.js'

export function topPostsTextTemplate(userName: string) {
  const url = `${env.BASE_URL}`
  return `
Olá, ${userName}!

Um ou mais posts seus foram destaque no número de curtidas hoje!
Confira-os em nosso site:
${url}

Atenciosamente,
  `.trim()
}
