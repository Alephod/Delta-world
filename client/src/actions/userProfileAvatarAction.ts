import { Dispatch } from 'redux';
import { GetUserInfo } from '../api/dummyapi';

const loadProfileAction: any = () => ({
    type: 'AVATAR/GET_USER_INFO',
});
const SuccessProfileAction: any = (user: any) => ({
    type: 'AVATAR/GET_USER_INFO_SUCCESS',
    user: user
});
const ErrorProfileAction: any = (errorObj: any) => ({
    type: 'AVATAR/GET_USER_INFO_ERROR',
    error: errorObj
});
export const loadUserAvatarInfoAction: any = (id: number) => (dispatch: Dispatch) => {
    dispatch(loadProfileAction());
    GetUserInfo(id)
        .then((resp: any) => {
            if (resp.error)
                dispatch(ErrorProfileAction(resp));
            else
                dispatch(SuccessProfileAction(resp.data));
        });
};
