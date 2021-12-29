import PostService from '../services/postService.js';
import { fileLogger } from '../logger.js';
import format from 'string-format';

class UserController {
    async getPosts(req, res) {
        let page = req.query.page ? Number(req.query.page) : 0;
        let limit = req.query.limit ? Number(req.query.limit) : 20;
        fileLogger.info(format('[PostController.getPosts] Request to the user. Search={}', JSON.stringify(req.query)));


        if (page < 0) page = 0;
        if (limit < 5 || limit > 20) limit = 20;

        try {
            const responseBody = JSON.stringify({
                status: 200, ...await PostService.getPosts(page, limit)
            });
            fileLogger.info(format('[PostController.getPosts] SUCCESS | Response to the user. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = 'Internal server error';
            const status = 400;
            fileLogger.error(format('[PostController.getPosts] ERROR | Response to the user. Status={} message={}', status, error));
            res.status(status).json({ status, error });
        }
    }

    async getPostInfo(req, res) {
        fileLogger.info(format('[PostController.getPost] Request to the user. Search={}', JSON.stringify(req.params)));

        try {
            const responseBody = JSON.stringify({
                status: 200, data: { ...await PostService.getPost(req.params.id) }
            });
            fileLogger.info(format('[PostController.getPost] SUCCESS | Response from the user. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = (e.message === '400') ? 'Post not found' : 'Internal server error';
            const status = (e.message === '400') ? 400 : 500;
            fileLogger.error(format('[PostController.getPost] ERROR | Response from the user. Status={} message={}', status, error));
            res.status(status).json({ status, error: error });
        }
    }

    async getPostsByUser(req, res) {
        let page = req.query.page ? Number(req.query.page) : 0;
        let limit = req.query.limit ? Number(req.query.limit) : 20;
        fileLogger.info(format('[PostController.getPostsByUser] Request to the User. Search={}', JSON.stringify(
            { ...req.query, ...req.params })
        ));

        if (page < 0) page = 0;
        if (limit < 5 || limit > 20) limit = 20;

        try {
            const responseBody = JSON.stringify({
                status: 200, ...await PostService.getPostsByUser(req.params.id, page, limit)
            });
            fileLogger.info(format('[PostController.getPostsByUser] SUCCESS | Response from the user. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = (e.message === '400') ? 'User not found' : 'Internal server error';
            const status = (e.message === '400') ? 400 : 500;
            fileLogger.error(format('[PostController.getPostsByUser] ERROR | Response from the user. Status={} message={}', status, error));
            res.status(status).json({ status, error: error });
        }
    }
}

export default new UserController();
