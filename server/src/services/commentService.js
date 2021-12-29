import { GetPostCommets } from '../api/dummyapi.js';
import { fileLogger } from '../logger.js';
import CommentMapper from '../mappers/commentMapper.js'
import format from 'string-format';

class CommentService {
    async getCommentsByPost(id, page, limit) {
        const response = await GetPostCommets(id, page, limit);
        switch (response.status) {
            case 200: {
                fileLogger.info(format('[CommentService.getCommentByPost] SUCCESS | Response from DumMyAPI. Status={}', response.status));
                return CommentMapper.convertComments(await response.data);
            }
            default: {
                fileLogger.error(format('[CommentService.getCommentByPost] ERROR | Response from DumMyAPI. Status={} message={}', response.status, response.statusText));
                throw new Error(response.status);
            }
        }
    }

}
export default new CommentService();
