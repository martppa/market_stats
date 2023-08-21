export default class News {
    id: string
    date: Date
    title: string
    description: string
    url: string
    assets: string[]
    tags: string[]
    score: number = 0

    constructor(
        id: string,
        date: Date,
        title: string,
        description: string,
        url: string,
        assets: string[],
        tags: string[],
    ) {
        this.id = id
        this.date = date,
        this.title = title,
        this.description = description,
        this.url = url
        this.assets = assets
        this.tags = tags
    }
}