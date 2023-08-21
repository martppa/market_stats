import Environment from "shared/domain/env/Environment";
import AccessTokenDataSource from "../AccessTokenDataSource";

export default class EnvAccessTokenDataSource implements AccessTokenDataSource {

    private environment: Environment

    constructor(environment: Environment) {
        this.environment = environment
    }
    
    async getNewsAccessToken(): Promise<string> {
        return this.environment.getTiingoAccessToken()
    }

}