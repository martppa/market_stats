export default interface AccessTokenDataSource {
    getNewsAccessToken(): Promise<string>
}