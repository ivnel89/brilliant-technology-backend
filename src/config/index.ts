import 'dotenv/config';

export class Config{
    private config : {
        DATABASE_HOST: string,
        DATABASE_PORT: number,
        DATABASE_USERNAME: string,
        DATABASE_PASSWORD: string,
        DATABASE_NAME: string
    }
    constructor(){
        this.config = process.env as any
    }
    get(){
        return this.config
    }
}