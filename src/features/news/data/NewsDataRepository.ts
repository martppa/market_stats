import News from "features/news/domain/models/News";
import NewsRepository from "features/news/domain/NewsRepository";
import NewsDataSource from "./datasource/NewsDataSource";

export default class NewsDataReppository implements NewsRepository {

    private dataSource: NewsDataSource

    constructor(dataSource: NewsDataSource) {
        this.dataSource = dataSource
    }

    getNews(assets: String[], tags: String[]): Promise<News[]> {
        return this.dataSource.getNews(assets, tags)
    }
}