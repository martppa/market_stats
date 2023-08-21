import axios, { AxiosHeaders } from 'axios'
import { response } from 'express'
import NewsDataSource from 'features/news/data/datasource/NewsDataSource'
import News from 'features/news/domain/models/News'
import AccessTokenDataSource from 'features/shared/data/token/AccessTokenDataSource'

export default class TiingoNewsDataSource implements NewsDataSource {

    private accessTokenDataSource: AccessTokenDataSource

    constructor(accessTokenDataSource: AccessTokenDataSource) {
        this.accessTokenDataSource = accessTokenDataSource
    }
    
    async getNews(assets: String[], tags: String[]): Promise<News[]> {
        const token = await this.accessTokenDataSource.getNewsAccessToken()
        const response = await axios.get(`https://api.tiingo.com/tiingo/news`, {
            params: {
                tickers: assets,
                tags: tags,
                token: token
            },
        })
        return this.parseNews(response)
        
    }

    private parseNews(rawNewsList: any): News[] {
        const news = []
        rawNewsList.data.forEach((rawNews: any) => {
            news.push(new News(
                rawNews.id,
                rawNews.publishedDate,
                rawNews.title,
                rawNews.description,
                rawNews.url,
                rawNews.tickers,
                rawNews.tags,
            ))
        })
        return news
    }
}