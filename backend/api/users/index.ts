import express from 'express';

import { addUser, getUsers } from '@backend/db/user';
import type { ExpressRequest } from '@backend/types';

const usersRouter = express.Router();

usersRouter.get(
    '/users/list',
    async (_req: ExpressRequest<'/api/users/list', 'get'>, res) => {
        const users = await getUsers();

        if (users) {
            res.json({
                success: true,
                data: users,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error getting users',
            });
        }
    },
);

usersRouter.post(
    '/users/add',
    async (req: ExpressRequest<'/api/users/add', 'post'>, res) => {
        if (!req.body) {
            res.status(400).json({
                success: false,
                message: 'No data provided',
            });

            return;
        }

        if (!req.body.name) {
            res.status(400).json({
                success: false,
                message: 'No name provided',
            });

            return;
        }

        if (!req.body.email) {
            res.status(400).json({
                success: false,
                message: 'No email provided',
            });

            return;
        }

        const result = await addUser({
            email: req.body.email,
            name: req.body.name,
        });

        if (!result) {
            res.status(500).json({
                success: false,
                message: 'Error adding user',
            });

            return;
        }

        res.json({
            success: true,
            data: result,
        });
    },
);

export default usersRouter;
