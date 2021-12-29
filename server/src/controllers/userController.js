import UserService from '../services/UserService.js';
import { fileLogger } from '../logger.js';
import format from 'string-format';

class UserController {
    async getUsers(req, res) {
        let page = req.query.page ? Number(req.query.page) : 0;
        let limit = req.query.limit ? Number(req.query.limit) : 20;
        fileLogger.info(format('[UserController.getUsers] Request to the User. Request={}', JSON.stringify(req.query)));

        if (page < 0) page = 0;
        if (limit < 5 || limit > 20) limit = 20;

        try {
            const responseBody = JSON.stringify({
                status: 200, ...await UserService.getUsers(page, limit)
            });
            fileLogger.info(format('[UserController.getUsers] SUCCESS | Response from the User. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = 'Internal server error';
            fileLogger.error(format('[UserController.getUsers] ERROR | Response from the user. Status={} message={}', 500, error));
            return res.status(500).json({ status: 500, error: error });
        }
    }
    async getUser(req, res) {
        fileLogger.info(format('[UserController.getUser] Request to the User. Search={}', JSON.stringify(req.params)));

        try {
            const responseBody = JSON.stringify({
                status: 200, data: { ...await UserService.getUser(req.params.id) }
            });
            fileLogger.info(format('[UserController.getUser] SUCCESS | Response from the user. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = (e.message === '400') ? 'User not found' : 'Internal server error';
            const status = (e.message === '400') ? 400 : 500;
            fileLogger.error(format('[UserController.getUser] ERROR | Response from the user. Status={} message={}', status, error));
            res.status(status).json({ status, error: error });
        }
    }
    async createUser(req, res) {
        fileLogger.info(format('[UserController.createUser] Request to the user. Search={}', JSON.stringify(req.params)));
        try {
            const results = await UserService.createUser(req.body);
            const responseBody = JSON.stringify({
                status: 200, data: { ...results }
            });
            fileLogger.info(format('[UserController.createUser] SUCCESS | Response from the user. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = (e.message === '400') ? 'Body not valid' : 'Internal server error';
            const status = (e.message === '400') ? 400 : 500;
            fileLogger.error(format('[UserController.createUser] ERROR | Response from the user. Status={} message={}', status, error));
            return res.status(status).json({ status, error });
        }
    }
    async updateUser(req, res) {
        fileLogger.info(format('[UserController.updateUser] Request to the user. Search={}', JSON.stringify(req.params)));
        try {
            const responseBody = JSON.stringify({
                status: 200, data: { ...await UserService.updateUser(req.params.id, req.body) }
            });
            fileLogger.info(format('[UserController.updateUser] SUCCESS | Response from the user. Data={}', responseBody));
            res.status(200).send(responseBody);
        } catch (e) {
            const error = (e.message === '400') ? 'User not found' : 'Internal server error';
            const status = (e.message === '400') ? 400 : 500;
            fileLogger.error(format('[UserController.updateUser] ERROR | Response from the user. Status={} message={}', status, error));
            res.status(status).json({ status, error });
        }
    }
}

export default new UserController();
