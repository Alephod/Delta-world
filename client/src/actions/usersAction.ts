import { Dispatch } from 'redux';
import { GetUsersList } from '../api/dummyapi';

const loadAction: any = () => ({
    type: 'LOAD_USERS',
});
const loadSuccessAction: any = (users: any) => ({
    type: 'LOAD_USERS_SUCCESS',
    usersList: users.data,
    usersTotal: users.total,
});
const errorProfileAction: any = (errorObj: any) => ({
    type: 'LOAD_USERS_ERROR',
    error: errorObj
});

export const loadUsersAction: any = (page: number, limit: number) => (dispatch: Dispatch) => {
    dispatch(loadAction());
    GetUsersList(page, limit)
        .then((resp: any) => {
            if (resp.error)
                dispatch(errorProfileAction(resp));
            else
                dispatch(loadSuccessAction(resp));
        });
};
