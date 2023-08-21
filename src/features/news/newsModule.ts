import { inject, register } from "easy_typed_di/dist/EasyDI"
import NewsDataReppository from "features/news/data/NewsDataRepository"
import NewsDataSource from "features/news/data/datasource/NewsDataSource"
import TiingoNewsDataSource from "features/news/data/datasource/network/tiingo/TiingoNewsDataSource"
import NewsRepository from "features/news/domain/NewsRepository"
import GetNews from "features/news/domain/use_case/GetNews"
import { ACCESS_TOKEN_DATASOURCE } from "features/shared/sharedModule"
import SentimentScoreDataSource from "features/news/data/datasource/memory/sentiment/SentimentScoreDataSource"
import ScoreDataSource from "features/news/data/datasource/ScoreDataSource"
import ScoreRepository from "./domain/ScoreRepository"
import ScoreDataReppository from "./data/ScoreDataRepository"

export const GET_NEWS = "GetNews"
export const NEWS_REPOSITORY = "NewsRepository"
export const NEWS_DATASOURCE = "NewsDataSource"
export const SCORE_DATASOURCE = "ScoreDataSource"
export const SCORE_REPOSITORY = "ScoreRepostory"

export default function mainModule() {
    register(GET_NEWS, () => new GetNews(inject(NEWS_REPOSITORY), inject(SCORE_REPOSITORY)))
    register<NewsRepository>(NEWS_REPOSITORY, () => new NewsDataReppository(inject(NEWS_DATASOURCE)))
    register<NewsDataSource>(NEWS_DATASOURCE, () => new TiingoNewsDataSource(inject(ACCESS_TOKEN_DATASOURCE)))
    register<ScoreRepository>(SCORE_REPOSITORY, () => new ScoreDataReppository(inject(SCORE_DATASOURCE)))
    register<ScoreDataSource>(SCORE_DATASOURCE, () => new SentimentScoreDataSource())
}