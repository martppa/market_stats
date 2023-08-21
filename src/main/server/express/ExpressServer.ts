import * as express from 'express';
import * as Router from 'routing-controllers';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import Server from '../Server';
import Environment from 'shared/domain/env/Environment';

const header = (_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
};

const errorHandler = (err, _, res, __) => {
    if (err.stack) console.error(err.stack);
    res.status(500).send(JSON.stringify({ errors: [ err.message ] }));
}

export default class ExpressServer implements Server {
    private express: express.Express;
    private environment: Environment

    public constructor(environment: Environment) {
        this.environment = environment
    }

    private configureServer(controllers: any): void {
        this.express = this.createServer(controllers);
        this.express.use(logger(this.environment.getBuildType()));
        this.express.use(bodyParser.json);
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(header);
        this.express.use(errorHandler);
    }

    public listen(controllers: any, port: Number): Promise<void> {
        this.configureServer(controllers);
        return new Promise((resolve, _) => {
            this.express.listen(port, () => {
                resolve()
            });
        });
    }

    private createServer(controllers: any): express.Express {
        return Router.createExpressServer({
            defaultErrorHandler: false,
            cors: true,
            controllers: controllers
        });
    }
}