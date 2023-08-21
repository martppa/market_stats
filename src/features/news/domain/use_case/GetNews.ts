import NewsRepository from "features/news/domain/NewsRepository"
import ScoreRepository from "features/news/domain/ScoreRepository"

export default class GetNews {

    private newsRepository: NewsRepository
    private scoreRepository: ScoreRepository

    constructor(newsRepository: NewsRepository, scoreRepository: ScoreRepository) {
        this.newsRepository = newsRepository
        this.scoreRepository = scoreRepository
    }

    async execute(assets: string[], tags: string[]) {
        const newsList = await this.newsRepository.getNews(assets, tags)
         newsList.forEach(async (item) => {
            item.score = await this.scoreRepository.getTextScore(item.description)
        })
        return newsList
    }
}