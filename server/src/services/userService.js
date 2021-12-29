import { GetUsersList, GetUserInfo, UpdateUser, CreateUser } from '../api/dummyapi.js';
import { fileLogger } from '../logger.js';
import UserMapper from '../mappers/userMapper.js'
import format from 'string-format';

class UserService {
    constructor() {
        this.getUsers = this.getUsers.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    async getUsers(page, limit) {
        const response = await GetUsersList(page, limit);
        switch (response.status) {
            case 200:
                fileLogger.info(format('[UserService.getUsers] SUCCESS | Response from DumMyAPI. Status={}', response.status));
                return UserMapper.convertUsersList(response.data);
            default:
                message = '[UserService.getUsers] ERROR | Response from DumMyAPI. Status={} error={}';
                fileLogger.error(format(message, response.status, response.statusText));
                throw new Error(format(message, response.status, response.statusText));
        }
    }
    async getUser(id) {
        const response = await GetUserInfo(id);
        switch (response.status) {
            case 200:
                fileLogger.info(format('[UserService.getUser] SUCCESS | Response from DumMyAPI. Status={}', 200));
                return UserMapper.convertUser(await response.data);
            default:
                fileLogger.error(format('[UserService.getUser] ERROR | Response from DumMyAPI. Status={} message={}', response.status, response.statusText));
                throw new Error(`Error from DymMyAPI. Status=${response.status}`);
        }
    }
    async updateUser(id, body) {
        let response = await UpdateUser(id, body);
        switch (response.status) {
            case 200:
                fileLogger.info(format('[UserService.updateUser] SUCCESS | Response from DumMyAPI. Status={}', 200));
                return UserMapper.convertUser(await response.data);
            default:
                fileLogger.error(format('[UserService.updateUser] ERROR | Response from DumMyAPI. Status={} message={}', response.status, response.statusText));
                throw new Error(response.status);
        }
    }
    async createUser(body) {
        const response = await CreateUser(body);
        switch (response.status) {
            case 200: {
                fileLogger.info(format('[UserService.createUser] SUCCESS | Response from DumMyAPI. Status={}', response.status));
                return await response.data;
            }
            default: {
                fileLogger.error(format('[UserService.createUser] ERROR | Response from DumMyAPI. Status={} message={}', response.status, response.statusText));
                throw new Error(response.status);
            }
        }
    }
}
export default new UserService();
