import News from "features/news/domain/models/News";

export default interface NewsRepository {
    getNews(assets: String[], tags: String[]): Promise<News[]>
}