import { inject } from "easy_typed_di/dist/EasyDI";
import { Body, Get, Req, Res } from "routing-controllers";
import { JsonController } from "routing-controllers/decorator/JsonController";
import Logger from "shared/domain/logger/Logger";
import GetNews from "../domain/use_case/GetNews";
import { LOGGER } from "features/shared/sharedModule";
import { GET_NEWS } from "features/news/newsModule";

@JsonController('/news')
export default class NewsController {

    private readonly TAG: string = this.constructor.name;

    private logger: Logger = inject(LOGGER)
    private getNews: GetNews = inject(GET_NEWS)
    
    @Get('/')
    public async requestNews(@Req() req: any, @Body() body: any, @Res() res: any) {
        const tags = req.query.tags
        const assets = req.query.assets

        const news = await this.getNews.execute(assets, tags)

        return res.send(news);
    }
}