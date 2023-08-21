import ScoreDataSource from "features/news/data/datasource/ScoreDataSource";

const Sentiment = require("sentiment")

export default class SentimentScoreDataSource implements ScoreDataSource {

    private sentiment = new Sentiment()
    
    async getTextScore(text: string): Promise<number> {
        const result = this.sentiment.analyze(text)
        console.log(result)
        return result.score
    }
}