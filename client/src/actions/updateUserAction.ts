import { Dispatch } from 'redux';
import { UpdateUser } from '../api/dummyapi';

const userUpdateAction: any = () => ({
    type: 'UPDATE_USER'
});
const userUpdateSuccessAction: any = (newUserInfo: any) => ({
    type: 'UPDATE_USER_SUCCESS',
    newUserInfo: newUserInfo
});
const userUpdateErrorAction: any = (errorObj: any) => ({
    type: 'UPDATE_USER_ERROR',
    error: errorObj
});

export const updateUserAction: any = (id: string, user: any) => (dispatch: Dispatch) => {
    dispatch(userUpdateAction());
    UpdateUser(id, user)
        .then((resp: any) => {
            if (resp.error)
                dispatch(userUpdateErrorAction(resp));
            else
                dispatch(userUpdateSuccessAction(resp.data));
        });
};
