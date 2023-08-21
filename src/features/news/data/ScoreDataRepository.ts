import ScoreDataSource from "./datasource/ScoreDataSource";

export default class ScoreDataReppository implements ScoreDataSource {

    private dataSource: ScoreDataSource

    constructor(dataSource: ScoreDataSource) {
        this.dataSource = dataSource
    }

    getTextScore(text: string): Promise<number> {
        return this.dataSource.getTextScore(text)
    }
}