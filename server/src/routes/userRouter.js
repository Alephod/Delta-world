import Router from 'express';
import UserController from '../controllers/UserController.js';
import PostController from '../controllers/postController.js';

const userRouter = new Router();

userRouter.get('', UserController.getUsers);
userRouter.get('/:id', UserController.getUser);
userRouter.post('/create', UserController.createUser);
userRouter.put('/:id', UserController.updateUser);
userRouter.get('/:id/post', PostController.getPostsByUser);



export default userRouter;
