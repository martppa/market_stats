import { inject } from "easy_typed_di/dist/EasyDI";
import newsModule from "features/news/newsModule";
import NewsController from "features/news/service/NewsController";
import sharedModule, { ENVIRONMENT, LOGGER } from "features/shared/sharedModule";
import mainModule, { SERVER } from "main/di/mainModule";
import Server from "main/server/Server";
import Environment from "shared/domain/env/Environment";
import Logger from "shared/domain/logger/Logger";

export default class MarketStatsApplication {

    protected readonly SERVER_MESSAGE = "Server started at port:";
    protected readonly TAG: string = this.constructor.name;

    protected server: Server;
    protected logger: Logger;
    protected environment: Environment

    public constructor() {
        this.initDependencies()
        this.logger = inject(LOGGER)
        this.server = inject(SERVER)
        this.environment = inject(ENVIRONMENT)
    }

    private initDependencies() {
        mainModule()
        sharedModule()
        newsModule()
    }

    public async init() {
        try {
            const port = this.environment.getServerPort()
            await this.startServer(port);
            this.logger.info(this.TAG, `Server started at: ${port}`);
        } catch (error) {
            this.logger.error(this.TAG, `Error initializing the server:`, error);
            process.exit(1);
        }          
    }

    protected async startServer(port: Number): Promise<void> {
        await this.server.listen([
            NewsController
        ], port);
    }
}