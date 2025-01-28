import type { NextFunction, Request, Response } from 'express';

import next from 'next';

import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'node:fs';
import swaggerUi from 'swagger-ui-express';

import apiRouter from '@backend/api';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, turbopack: true });

const handle = app.getRequestHandler();

app.prepare()
    .then(async () => {
        const server = express();

        server.use(cookieParser());
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        server.use('/api', apiRouter);

        const docs = fs.readFileSync('./api.json', 'utf-8');

        server.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(JSON.parse(docs)),
        );

        server.all('*', (req, res) => handle(req, res));
        server.use(
            (
                err: { status: number; message: string; errors: string[] },
                _req: Request,
                res: Response,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _next: NextFunction,
            ) => {
                res.status(err.status || 500).json({
                    message: err.message,
                    errors: err.errors,
                });
            },
        );

        server.listen(3000, () => {
            console.log('Server listening on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

process.on('uncaughtException', err => {
    console.error('Uncaught exception:', err);
    process.exit(1);
});
