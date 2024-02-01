import assert from 'assert';

import { runtime } from '../runtime.js';

describe('GET /tasks/{taskId}', () => {

    beforeEach(async () => {
        await runtime.taskRepository.createTask({
            id: '123',
            title: 'Write some code',
            isCompleted: true,
        });
    });

    it('returns task if it exists', async () => {
        const res = await runtime.fetch('/tasks/123');
        assert.strictEqual(res.status, 200);
        const body = await res.json();
        assert.strictEqual(body.id, '123');
        assert.strictEqual(body.title, 'Write some code');
        assert.strictEqual(body.isCompleted, true);
    });

    it('returns 404 if task does not exist', async () => {
        const res = await runtime.fetch('/tasks/345');
        assert.strictEqual(res.status, 404);
        const body = await res.json();
        assert.strictEqual(body.name, 'NotFoundError');
    });

});

describe('GET /tasks', () => {

    it('returns the list of all tasks');

});

describe('POST /tasks', () => {

    it('creates a new task');

});

describe('PUT /tasks/{taskId}/complete', () => {

    it('marks existing task as completed');
    it('returns 404 if task does not exist');

});

describe('DELETE /tasks/{taskId}', () => {

    it('deletes a task');
    it('returns 404 if task does not exist');

});
