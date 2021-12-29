import { GetUserPosts, GetPostInfo, GetPosts } from '../api/dummyapi.js';
import { fileLogger } from '../logger.js';
import PostMapper from '../mappers/postMapper.js'
import format from 'string-format';

class PostService {
    constructor() {
        this.getPosts = this.getPosts.bind(this);
        this.getPost = this.getPost.bind(this);
        this.getPostsByUser = this.getPostsByUser.bind(this);
    }

    async getPosts(page, limit) {
        const response = await GetPosts(page, limit);
        switch (response.status) {
            case 200:
                fileLogger.info(format('[PostService.getPosts] SUCCESS | Response from DumMyAPI. Status={}', 200));
                return PostMapper.convertPosts(await response.data);
            default:
                fileLogger.error(format('[PostService.getPosts] ERROR | Response from DumMyAPI. Status={} message={}', response.status, response.statusText));
                throw new Error(response.status);
        }
    }
    async getPost(id) {
        const response = await GetPostInfo(id);
        switch (response.status) {
            case 200:
                fileLogger.info(format('[PostService.getPost] SUCCESS | Response from DumMyAPI. Status={}', 200));
                return PostMapper.convertPost(await response.data);
            default:
                fileLogger.error(format('[PostService.getPost] ERROR | Response from DumMyAPI. Status={} message={}', response.status, response.statusText));
                throw new Error(500);
        }
    }
    async getPostsByUser(id, page, limit) {
        const response = await GetUserPosts(id, page, limit);
        switch (response.status) {
            case 200:
                fileLogger.info(format('[PostService.getPostsByUser] SUCCESS | Response from DumMyAPI. Status={}', 200));
                return PostMapper.convertUsersPosts(await response.data);
            default:
                fileLogger.error(format('[PostService.getPostsByUser] ERROR | Response from DumMyAPI. Status={} message={}', response.status, response.statusText));
                throw new Error(500);

        }
    }
}
export default new PostService();
