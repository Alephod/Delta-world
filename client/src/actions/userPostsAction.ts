import { Dispatch } from 'redux';
import { GetUserPosts } from '../api/dummyapi';

const loadUserPostsAction: any = () => ({
    type: 'GET_USER_POSTS',
});
const SuccessUserPostsAction: any = (postsObj: any) => ({
    type: 'GET_USER_POSTS_SUCCESS',
    posts: postsObj.data,
    total: postsObj.total
});
const ErrorUserPostsAction: any = (errorObj: any) => ({
    type: 'GET_USER_POSTS_ERROR',
    error: errorObj
});

export const userPostsAction: any = (id: number, page: number, limit: number) => (dispatch: Dispatch) => {
    dispatch(loadUserPostsAction());
    GetUserPosts(id, page, limit)
        .then((resp: any) => {
            if (resp.error)
                dispatch(ErrorUserPostsAction(resp));
            else
                dispatch(SuccessUserPostsAction(resp));
        });
};
