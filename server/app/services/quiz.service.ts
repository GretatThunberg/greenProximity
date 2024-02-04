import { Collection, InsertOneResult } from 'mongodb';
import { Service } from 'typedi';
import { DB_CONSTS, dbService } from './database.service';

@Service()
export class UserService {
    private dbService = dbService;

    private get collection(): Collection {
        if (!this.dbService) {
            throw new Error('Database connection not initialized');
        }
        if (!this.dbService.db) {
            throw new Error('Database not initialized');
        }
        return this.dbService.db.collection(DB_CONSTS.DB_COLLECTION_QUIZZES);
    }

    async retrieveAllUsers(): Promise<unknown[]> {
        return await this.collection.find({}).toArray();
    }

    async getUserByEmail(email: string): Promise<unknown | null> {
        return await this.collection.findOne({ email });
    }

    async modifyUser(email: string, updatedUserData: unknown): Promise<unknown> {
        await this.collection.updateOne({ email }, { $set: updatedUserData });
        return await this.collection.findOne({ email });
    }

    async addUser(newUserData: unknown): Promise<unknown> {
        try {
            const insertResult: InsertOneResult<unknown> = await this.collection.insertOne(newUserData);
            const insertedId: unknown = insertResult.insertedId;
            const insertedUser = await this.collection.findOne({ _id: insertedId });
            return insertedUser;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }
}
