import Environment, { BUILD_DEBUG } from "shared/domain/env/Environment";

export default class BuildEnvironment implements Environment {
    
    getServerPort(): Number {
        if (process.env.PORT) return Number(process.env.PORT)
        return 3000
    }

    getBuildType(): string {
        return process.env['BUILD'] || BUILD_DEBUG
    }

    isAllowedToPrintLogs(): Boolean {
        if (process.env['PRINT_LOGS']) return Boolean(process.env['PRINT_LOGS'])
        return true
    }

    getTiingoAccessToken(): string {
        return process.env['TIINGO_TOKEN']
    }
}