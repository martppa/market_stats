export default interface Server {
    listen(controllers: any, port: Number): Promise<void>;
}