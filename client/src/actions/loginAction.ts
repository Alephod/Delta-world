import { GetUserInfo } from '../api/dummyapi';
import { Dispatch } from 'redux';

const userLoginAction: any = () => ({
    type: 'LOGIN_USER'
});
const userLoginSuccessAction: any = (id: string) => ({
    userID: id,
    type: 'LOGIN_USER_SUCCESS',
});
const userLoginErrorAction: any = (errorObj: any) => ({
    type: 'LOGIN_USER_ERROR',
    error: errorObj,
});

export const loginUserAction: any = (id: string) => (dispatch: Dispatch) => {
    dispatch(userLoginAction());
    GetUserInfo(id)
        .then((resp: any) => {
            if (resp.error)
                dispatch(userLoginErrorAction(resp));
            else
                dispatch(userLoginSuccessAction(id));
        });
};
