import produce from 'immer';


export interface UsersState {
    loading: boolean;
    href: string;
    isError?: boolean;
    error?: string;
    errorCode?: string;
}

const initialState: UsersState = {
    loading: false,
    href: ''
};

const update: Function = (draft: any) => {
    draft.loading = true;
    draft.isError = false;
    draft.error = '';
    return draft;
};
const updateSuccess: Function = (draft: any, href: string) => {
    draft.href = href;
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

export const uploadReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'UPLOAD_PHOTO':
                return update(draft);
            case 'UPLOAD_PHOTO_SUCCESS':
                return updateSuccess(draft, action.href);
            case 'UPLOAD_PHOTO_ERROR':
                return updateError(draft, action.error);

            default: return state;
        }
    },
);
