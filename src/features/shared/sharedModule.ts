import { register, inject } from 'easy_typed_di/dist/EasyDI'
import AccessTokenDataSource from 'features/shared/data/token/AccessTokenDataSource'
import EnvAccessTokenDataSource from 'features/shared/data/token/env/EnvAccessTokenDataSource'
import BuildEnvironment from 'shared/service/env/BuildEnvironment'
import WinstonLogger from 'shared/service/logger/winston/WinstonLogger'

export const ACCESS_TOKEN_DATASOURCE = "AccessTokenDataSource"
export const ENVIRONMENT = "Environment"
export const LOGGER = "Logger"

export default function sharedModule() {
    register(ENVIRONMENT, () => new BuildEnvironment())
    register(LOGGER, () => new WinstonLogger(inject(ENVIRONMENT)))
    register<AccessTokenDataSource>(ACCESS_TOKEN_DATASOURCE, () => new EnvAccessTokenDataSource(inject(ENVIRONMENT)))
}