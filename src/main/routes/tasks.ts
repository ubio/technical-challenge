import { BodyParam, Delete, Get, PathParam, Post, Put, Router } from '@ubio/framework';
import { dep } from 'mesh-ioc';

import { TasksService } from '../services/tasks.js';

export class TasksRouter extends Router {
    @dep() private taskService!: TasksService;

    @Get({ path: '/task/{taskId}' })
    async getTask(
        @PathParam('taskId', { schema: { type: 'string' }, required: true })
        taskId: string
    ) {
        return await this.taskService.get(taskId);
    }

    @Get({ path: '/tasks' })
    async getTasks() {
        return await this.taskService.getAll();
    }

    @Post({ path: '/task' })
    async createTask(
        @BodyParam('title', { schema: { type: 'string' }, required: true })
        title: string,
        @BodyParam('description', { schema: { type: 'string' }, required: false })
        description?: string
    ) {
        const taskId = await this.taskService.create(title, description);

        this.ctx.status = 201;
        return taskId;
    }

    @Put({ path: '/task/{taskId}/complete' })
    async completeTask(
        @PathParam('taskId', { schema: { type: 'string' }, required: true })
        taskId: string
    ) {
        const task = await this.taskService.complete(taskId);
        return task;
    }

    @Delete({ path: '/tasks/{taskId}' })
    async deleteTask(
        @PathParam('taskId', { schema: { type: 'string' }, required: true })
        taskId: string
    ) {
        const task = await this.taskService.delete(taskId);
        return task;
    }
}
