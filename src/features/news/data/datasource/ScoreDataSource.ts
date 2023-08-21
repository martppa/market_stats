export default interface ScoreDataSource {
    getTextScore(text: string): Promise<number>
}