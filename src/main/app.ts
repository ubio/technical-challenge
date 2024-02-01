import { Application } from '@ubio/framework';
import { MongoDb } from '@ubio/framework/modules/mongodb';
import { dep } from 'mesh-ioc';

import { TaskRepository } from './repositories/task.js';
import { MongoTaskRepository } from './repositories/task.mongo.js';
import { StatusRouter } from './routes/status.js';
import { TaskRouter } from './routes/tasks.js';
import { TaskService } from './services/task.js';

export class App extends Application {
    @dep() private mongodb!: MongoDb;

    override createGlobalScope() {
        const mesh = super.createGlobalScope();
        mesh.service(MongoDb);
        mesh.service(TaskRepository, MongoTaskRepository);
        mesh.service(TaskService);
        return mesh;
    }

    override createHttpRequestScope() {
        const mesh = super.createHttpRequestScope();
        mesh.service(StatusRouter);
        mesh.service(TaskRouter);
        return mesh;
    }

    override async beforeStart() {
        await this.mongodb.start();
        await this.httpServer.startServer();
    }

    override async afterStop() {
        await this.httpServer.stopServer();
        await this.mongodb.stop();
    }
}
