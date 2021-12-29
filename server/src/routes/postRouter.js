import Router from 'express';
import CommentController from '../controllers/commentController.js';
import PostController from '../controllers/postController.js';

const postRouter = new Router();

postRouter.get('', PostController.getPosts);
postRouter.get('/:id', PostController.getPostInfo);
postRouter.get('/:id/comment', CommentController.getCommentsByPost);

export default postRouter;
