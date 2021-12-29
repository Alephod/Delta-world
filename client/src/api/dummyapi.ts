import { BASE_URL } from '../constants/api/dummyapi';

export const GetUsersList: Function = (
    page: number,
    limit: number,
) => {
    return fetch(`${BASE_URL}/user?page=${page}&limit=${limit}`, {
        method: 'GET',
    }).then((response: any) => {
        return response.json();
    });
};

export const GetUserInfo: Function = (
    id: string
) => {
    return fetch(`${BASE_URL}/user/${id}`, {
        method: 'GET',
    }).then((response: any) => {
        return response.json();
    });
};

export const CreateUser: Function = (
    user: object
) => {
    return fetch(`${BASE_URL}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((response: any) => {
        return response.json();
    });
};

export const UpdateUser: Function = (
    id: string,
    newUserInfo: any
) => {
    return fetch(`${BASE_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserInfo)
    }).then((response: any) => {
        return response.json();
    });
};

export const GetUserPosts: Function = (
    userID: string,
    page: number,
    limit: number
) => {
    return fetch(`${BASE_URL}/user/${userID}/post?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response: any) => {
        return response.json();
    });
};

export const GetPostInfo: Function = (
    id: string
) => {
    return fetch(`${BASE_URL}/post/${id}`, {
        method: 'GET',
    }).then((response: any) => {
        return response.json();
    });
};

export const GetPostCommets: Function = (
    id: string,
    page: number,
    limit: number
) => {
    return fetch(`${BASE_URL}/post/${id}/comment?page=${page}&limit=${limit}`, {
        method: 'GET',
    }).then((response: any) => {
        return response.json();
    });
};

export const GetPosts: Function = (
    page: number,
    limit: number
) => {
    return fetch(`${BASE_URL}/post?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response: any) => {
        return response.json();
    });
};
