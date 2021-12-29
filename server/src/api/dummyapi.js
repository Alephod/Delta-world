import { APP_ID, BASE_URL } from '../constants/api/dummyapi.js';
import axios from 'axios';

export const GetUsersList = (page, limit) => {
    return axios(`${BASE_URL}user?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: { 'app-id': APP_ID }
    });
};

export const GetUserInfo = (id) => {
    return axios(`${BASE_URL}user/${id}`, {
        method: 'GET',
        headers: { 'app-id': APP_ID }
    });
};

export const CreateUser = (user) => {
    return axios.post(`${BASE_URL}user/create`,
        user,
        {
            headers: {
                'app-id': APP_ID,
                'Content-Type': 'application/json'
            }
        }
    );
};

export const UpdateUser = (id, newUserInfo) => {
    return axios.put(`${BASE_URL}user/${id}`,
        newUserInfo,
        {
            headers: {
                'app-id': APP_ID,
                'Content-Type': 'application/json'
            }
        },
    );
};

export const GetUserPosts = (userID, page, limit) => {
    return axios(`${BASE_URL}user/${userID}/post?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'app-id': APP_ID,
            'Content-Type': 'application/json'
        }
    });
};

export const GetPostInfo = (id) => {
    return axios(`${BASE_URL}post/${id}`, {
        method: 'GET',
        headers: { 'app-id': APP_ID }
    });
};

export const GetPostCommets = (id, page, limit) => {
    return axios(`${BASE_URL}post/${id}/comment?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: { 'app-id': APP_ID }
    });
};

export const GetPosts = (page, limit) => {
    return axios(`${BASE_URL}post?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'app-id': APP_ID,
            'Content-Type': 'application/json'
        },
    });
};
