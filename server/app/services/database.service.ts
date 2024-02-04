import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { Service } from 'typedi';

export const DB_CONSTS = {
    DB_DB: 'GreenProximity',
    DB_COLLECTION_QUIZZES: 'Users',
    DB_URL: 'mongodb+srv://polyhx:polyhx@cluster0.mdnufet.mongodb.net/?retryWrites=true&w=majority',
};

@Service()
export class DatabaseService {
    db: Db | undefined;
    private client: MongoClient | undefined;

    async connectToServer(uri: string) {
        try {
            this.client = new MongoClient(uri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            });
            await this.client.connect();
            this.db = this.client.db(DB_CONSTS.DB_DB);
            // eslint-disable-next-line no-console
            console.log('Successfully connected to MongoDB.');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
        }
    }
}

const dbService = new DatabaseService();
dbService.connectToServer(DB_CONSTS.DB_URL);
export { dbService };
