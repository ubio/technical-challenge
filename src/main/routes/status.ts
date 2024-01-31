import { Get, Router } from '@ubio/framework';
import fs from 'fs';
import path from 'path';

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));

export class StatusRouter extends Router {
    @Get({
        path: '/status',
    })
    async status(): Promise<{ version: string }> {
        return {
            version: pkg.version,
        };
    }
}
