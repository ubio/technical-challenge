import { config } from '@ubio/framework';
import { Db, MongoClient } from 'mongodb';

export class MongoDb {
    @config() MONGO_URL!: string;

    client = new MongoClient(this.MONGO_URL);

    get db(): Db {
        return this.client.db();
    }
}
