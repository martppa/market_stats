export default interface ScoreRepository {
    getTextScore(text: string): Promise<number>
}