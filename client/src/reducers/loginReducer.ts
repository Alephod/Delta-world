import produce from 'immer';

export interface UsersState {
    redirect: boolean;
    loading: boolean;
    isError?: boolean;
    error?: string;
}

const initialState: UsersState = {
    redirect: false,
    loading: false
};

const login: Function = (draft: any) => {
    draft.redirect = false;
    draft.isError = false;
    draft.error = '';
    draft.loading = true;
    return draft;
};
const loginSuccess: Function = (draft: any) => {
    draft.redirect = true;
    draft.loading = false;
    return draft;
};
const loginError: Function = (draft: any, errorObj?: any) => {
    draft.loading = false;
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};
export const loginReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'LOGIN_USER':
                return login(draft);
            case 'LOGIN_USER_SUCCESS':
                localStorage.setItem('user', JSON.stringify({ id: action.userID, auth: true }));
                return loginSuccess(draft, action.userID);
            case 'LOGIN_USER_ERROR':
                return loginError(draft, action.error);
            default: return state;
        }
    },
);
