import { app } from './app.js'
import { env } from './env/index.js'
import cron from 'node-cron'
import { makeSendEmailUsersUseCase } from './use-cases/factories/cron-jobs/make-send-email-users.js'

try {
  cron.schedule("* * * * *", () => {
    const sendEmailUseCase = makeSendEmailUsersUseCase()
    sendEmailUseCase.execute()
  })
} catch (error) {
    console.log(error)
}

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(async () => {
    const url = `http://localhost:${env.PORT}`
    console.log(`🚀 HTTP Server Running at ${url}`)
  })
