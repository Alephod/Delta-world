import Router from 'express';
import userRouter from './userRouter.js';
import postRouter from './postRouter.js';

export const router = new Router();

router.use('/user', userRouter);
router.use('/post', postRouter);
