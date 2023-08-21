export const BUILD_RELEASE: string = "release";
export const BUILD_DEBUG: string = "debug";

export default interface Environment {
    getServerPort(): Number
    getBuildType(): string
    isAllowedToPrintLogs(): Boolean
 
    getTiingoAccessToken(): string
}