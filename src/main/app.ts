import { Application } from '@ubio/framework';
import { MongoDb } from '@ubio/framework/modules/mongodb';
import { dep } from 'mesh-ioc';

import { TasksRepository } from './repositories/tasks.js';
import { StatusRouter } from './routes/status.js';
import { TasksRouter } from './routes/tasks.js';
import { TasksService } from './services/tasks.js';

export class App extends Application {
    @dep() private mongodb!: MongoDb;

    override createGlobalScope() {
        const mesh = super.createGlobalScope();
        mesh.service(MongoDb);
        mesh.service(TasksRepository);
        mesh.service(TasksService);
        return mesh;
    }

    override createHttpRequestScope() {
        const mesh = super.createHttpRequestScope();
        mesh.service(StatusRouter);
        mesh.service(TasksRouter);
        return mesh;
    }

    override async beforeStart() {
        await this.mongodb.client.connect();
        await this.httpServer.startServer();
    }

    override async afterStop() {
        await this.httpServer.stopServer();
        await this.mongodb.client.close();
    }
}
