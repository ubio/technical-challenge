import { Logger } from '@ubio/framework';
import { randomUUID } from 'crypto';
import { dep } from 'mesh-ioc';
import { WithId } from 'mongodb';

import { Task } from '../entities/task.js';
import { TasksRepository } from '../repositories/tasks.js';

export class TasksService {
    @dep() private taskRepository!: TasksRepository;
    @dep() private logger!: Logger;

    async get(taskId: string) {
        const [rawTask] = await this.taskRepository.find({ id: taskId });
        const task = this.parseTask(rawTask);

        this.logger.info(`Task ${taskId} was fetched`);

        return task;
    }

    async getAll() {
        const rawTasks = await this.taskRepository.find({});
        const tasks = rawTasks.map(this.parseTask);

        return tasks;
    }

    async create(title: string, description?: string) {
        const task = {
            id: randomUUID().toString(),
            title,
            description,
            isCompleted: false,
        };

        await this.taskRepository.insertOne(task);

        this.logger.info(`Task ${task.id} was inserted`, task);

        return task.id;
    }

    async complete(taskId: string) {
        await this.taskRepository.updateOne({ id: taskId }, { $set: { isCompleted: true } });

        return taskId;
    }

    async delete(taskId: string) {
        await this.taskRepository.delete({ id: taskId });

        this.logger.info(`Task ${taskId} was deleted`);
    }

    private parseTask(rawTask: WithId<Task>): Task {
        const { _id, ...task } = rawTask;
        return task;
    }
}
