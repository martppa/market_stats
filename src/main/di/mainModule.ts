import { register, inject } from 'easy_typed_di/dist/EasyDI'
import { ENVIRONMENT } from 'features/shared/sharedModule'
import ExpressServer from 'main/server/express/ExpressServer'

export const SERVER = "Server"

export default function mainModule() {
    register(SERVER, () => new ExpressServer(inject(ENVIRONMENT)))
}