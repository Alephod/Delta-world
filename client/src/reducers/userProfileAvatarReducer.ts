import produce from 'immer';


export interface UsersState {
    userInfo: Object;
    loading: boolean;
    isError?: boolean;
    error?: string;
    errorCode?: string;
}

const initialState: UsersState = {
    userInfo: {},
    loading: false,
};

const load: Function = (draft: any) => {
    draft.loading = true;
    draft.isError = false;
    draft.error = '';
    return draft;
};
const loadSuccess: Function = (draft: any, userInfo?: any) => {
    draft.userInfo = userInfo || {};
    draft.userID = userInfo.id;
    draft.loading = false;
    return draft;
};
const loadError: Function = (draft: any, errorObj: any) => {
    draft.userInfo = {};
    draft.loading = false;
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};

export const userProfileAvatarReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'AVATAR/GET_USER_INFO':
                return load(draft);
            case 'AVATAR/GET_USER_INFO_SUCCESS':
                return loadSuccess(draft, action.user);
            case 'AVATAR/GET_USER_INFO_ERROR':
                return loadError(draft, action.error);
            default: return state;
        }
    },
);
