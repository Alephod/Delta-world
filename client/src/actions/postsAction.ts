import { Dispatch } from 'redux';
import { GetPosts } from '../api/dummyapi';

const loadPostsAction: any = () => ({
    type: 'GET_POSTS',
});
const SuccessPostsAction: any = (postsObj: any) => ({
    type: 'GET_POSTS_SUCCESS',
    posts: postsObj.data,
    total: postsObj.total
});
const ErrorPostsAction: any = (errorObj: any) => ({
    type: 'GET_POSTS_ERROR',
    error: errorObj
});

export const postsAction: any = (page: number, limit: number) => (dispatch: Dispatch) => {
    dispatch(loadPostsAction());
    GetPosts(page, limit)
        .then((resp: any) => {
            if (resp.error)
                dispatch(ErrorPostsAction(resp));
            else
                dispatch(SuccessPostsAction(resp));
        });
};
