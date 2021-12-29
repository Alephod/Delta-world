import produce from 'immer';


export interface UsersState {
    loading: boolean;
    newUserInfo?: any;
    isError?: boolean;
    error?: string;
    errorCode?: string;
}

const initialState: UsersState = {
    loading: false,
};

const update: Function = (draft: any) => {
    draft.loading = true;
    draft.isError = false;
    draft.error = '';
    return draft;
};
const updateSuccess: Function = (draft: any, newUserInfo: any)  => {
    draft.newUserInfo = newUserInfo;
    draft.redirect = true;
    draft.loading = false;
    return draft;
};
const updateError: Function = (draft: any, errorObj?: any) => {
    draft.loading = false;
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};

export const updateReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'UPDATE_USER':
                return update(draft);
            case 'UPDATE_USER_SUCCESS':
                return updateSuccess(draft, action.newUserInfo);
            case 'UPDATE_USER_ERROR':
                return updateError(draft, action.error);

            default: return state;
        }
    },
);
