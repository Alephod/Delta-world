import { GetPostInfo } from './../api/dummyapi';
import { Dispatch } from 'redux';

const getPostAction: any = () => ({
    type: 'POST_INFO'
});
const getPostSuccessAction: any = (postObj: any) => ({
    postInfo: postObj,
    type: 'POST_INFO_SUCCESS',
});
const getPostErrorAction: any = (errorObj: any) => ({
    type: 'POST_INFO_ERROR',
    error: errorObj,
});

export const getpostInfoAction: any = (id: string) => (dispatch: Dispatch) => {
    dispatch(getPostAction());
    GetPostInfo(id)
        .then((resp: any) => {
            if (resp.error)
                dispatch(getPostErrorAction(resp));
            else
                dispatch(getPostSuccessAction(resp.data));
        });
};
