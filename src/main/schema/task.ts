import { Schema } from '@ubio/framework';

export type Task = {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
};

export const TaskSchema = new Schema<Task>({
    schema: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string', optional: true },
            isCompleted: { type: 'boolean' },
        },
    },
});
