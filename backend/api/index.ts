import express from 'express';

import usersRouter from '@backend/api/users';
import type { ExpressRequest, ExpressResponse } from '@backend/types';

const apiRouter = express.Router();

apiRouter.get(
    '/hello',
    (
        req: ExpressRequest<'/api/hello', 'get'>,
        res: ExpressResponse<'/api/hello', 'get'>,
    ) => {
        res.json({
            success: true,
            data: { message: `Hello, ${req.query.name}!` },
        });
    },
);

apiRouter.use(usersRouter);

export default apiRouter;
