import { Dispatch } from 'redux';
import { CreateUser } from '../api/dummyapi';

const userAddAction: any = () => ({
    type: 'ADD_USER'
});
const userAddSuccessAction: any = (id: string) => ({
    type: 'ADD_USER_SUCCESS',
    userID: id
});
const userAddErrorAction: any = (errorObj: any) => ({
    type: 'ADD_USER_ERROR',
    error: errorObj
});

export const addNewUserAction: any = (user: any) => (dispatch: Dispatch) => {
    dispatch(userAddAction());
    CreateUser(user)
        .then((resp: any) => {
            if (resp.error)
                dispatch(userAddErrorAction(resp));
            else
                dispatch(userAddSuccessAction(resp.data.id));
        });
};
