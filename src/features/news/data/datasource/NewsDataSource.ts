import News from "features/news/domain/models/News";

export default interface NewsDataSource {
    getNews(assets: String[], tags: String[]): Promise<News[]>
}