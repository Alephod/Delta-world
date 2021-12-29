import commentService from '../services/commentService.js';
import { fileLogger } from '../logger.js';
import format from 'string-format';

class CommentController {
    async getCommentsByPost(req, res) {
        let page = req.query.page ? Number(req.query.page) : 0;
        let limit = req.query.limit ? Number(req.query.limit) : 20;
        fileLogger.info(format('[CommentController.getCommentByPost] Request to the user. Search={}', JSON.stringify(
            { ...req.query, ...req.params })
        ));

        if (page < 0) page = 0;
        if (limit < 5 || limit > 20) limit = 20;

        try {
            const responseBody = JSON.stringify({
                status: 200,
                ...await commentService.getCommentsByPost(req.params.id, page, limit)
            });
            fileLogger.info(format('[CommentController.getCommentByPost] SUCCESS | Response from the user. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = 'Internal server error';
            const status = 500;
            fileLogger.error(format('[CommentController.getCommentByPost] ERROR | Response from the user. Status={} message={}', status, error));
            return res.status(status).json({ status, error: error });
        }
    }
}

export default new CommentController();
