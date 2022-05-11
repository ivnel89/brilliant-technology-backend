import 'dotenv/config';

export class Config{
    private config : {
        DATABASE_HOST: string,
        DATABASE_PORT: number,
        DATABASE_USERNAME: string,
        DATABASE_PASSWORD: string,
        DATABASE_NAME: string,
        SERVER_PORT: string,
        REDIS_HOST: string,
        REDIS_PORT: string,
        REDIS_USERNAME: string,
        REDIS_PASSWORD: string
    }
    constructor(){
        this.config = process.env as any
    }
    get(){
        return this.config
    }
}