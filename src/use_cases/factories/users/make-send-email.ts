import { SendEmailUseCase } from "@/use_cases/messaging/send-email.js";


export function makeSendEmailUseCase() {
    return new SendEmailUseCase()
}