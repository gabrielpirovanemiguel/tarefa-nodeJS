import { env } from '@/env/index.js'

export function topPostsHtmlTemplate(userName: string) {
  const url = `${env.BASE_URL}`
  return `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Olá, ${userName}!</h2>
      <p>
        Um ou mais posts seus foram destaque no número de curtidas hoje!
        Confira-os em nosso site:
        <a href=${url}>${url}</a>
      </p>
      <p>
        Atenciosamente,<br>
      </p>
    </div>
  `
}
