import { GetPostCommets } from './../api/dummyapi';
import { Dispatch } from 'redux';

const getCommentsAction: any = () => ({
    type: 'COMMENTS'
});
const getCommentsSuccessAction: any = (commentsObj: any) => ({
    comments: commentsObj,
    type: 'COMMENTS_SUCCESS',
});
const getCommentsErrorAction: any = (errorObj: any) => ({
    type: 'COMMENTS_ERROR',
    error: errorObj,
});

export const commentsAction: any = (id: string, page: number, limit: number) => (dispatch: Dispatch) => {
    dispatch(getCommentsAction());
    GetPostCommets(id, page, limit)
        .then((resp: any) => {
            if (resp.error)
                dispatch(getCommentsErrorAction(resp));
            else
                dispatch(getCommentsSuccessAction(resp));
        });
};
