import { ClientError, Logger } from '@ubio/framework';
import { dep } from 'mesh-ioc';
import { Filter, FindOptions, UpdateFilter } from 'mongodb';

import { Task } from '../entities/task.js';
import { MongoDb } from '../mongodb.js';

export class TasksRepository {
    @dep() private mongodb!: MongoDb;
    @dep() logger!: Logger;

    protected get collection() {
        return this.mongodb.db.collection<Task>('tasks');
    }

    async setup() {
        const collections = await this.mongodb.db.listCollections().toArray();

        if (!collections.map(collection => collection.name).includes('tasks')) {
            await this.mongodb.db.createCollection('tasks');
        }

        const indexesCursor = await this.collection.listIndexes().toArray();
        const indexes = indexesCursor.map(doc => doc.name);

        if (!indexes.includes('unique_id')) {
            await this.collection.createIndex({ id: 1 }, { unique: true, name: 'unique_id' });
        }
    }

    async find(filter: Filter<Task>, options?: FindOptions<Document>) {
        return this.collection.find(filter, options).toArray();
    }

    async insertOne(task: Task) {
        try {
            return this.collection.insertOne(task);
        } catch (error) {
            // 11000 is a code for duplicate key error
            if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
                throw new ClientError(`Task with id ${task.id} already exists`);
            }
        }
    }

    async updateOne(filter: Filter<Task>, update: Partial<Task> | UpdateFilter<Task>) {
        return this.collection.updateOne(filter, update);
    }

    async delete(filter: Filter<Task>) {
        return this.collection.deleteMany(filter);
    }
}
