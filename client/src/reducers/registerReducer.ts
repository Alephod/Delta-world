import produce from 'immer';


export interface UsersState {
    redirect: boolean;
    userID: string;
    loading: boolean;
    isError?: boolean;
    error?: string;
    errorCode?: string;
}

const initialState: UsersState = {
    redirect: false,
    userID: '',
    loading: false
};

const upload: Function = (draft: any) => {
    draft.redirect = false;
    draft.loading = true;
    draft.isError = false;
    draft.error = '';
    return draft;
};
const uploadSuccess: Function = (draft: any, newUserID: string) => {
    draft.userID = newUserID;
    draft.redirect = true;
    draft.loading = false;
    return draft;
};
const uploadError: Function = (draft: any, errorObj?: any) => {
    draft.loading = false;
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};

export const registerReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'ADD_USER':
                return upload(draft);
            case 'ADD_USER_SUCCESS':
                localStorage.setItem('user', JSON.stringify({ id: action.userID, auth: true }));
                return uploadSuccess(draft, action.userID);
            case 'ADD_USER_ERROR':
                return uploadError(draft, action.error);

            default: return state;
        }
    },
);
