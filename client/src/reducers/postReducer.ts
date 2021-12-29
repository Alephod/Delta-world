import produce from 'immer';

export interface UsersState {
    loading: boolean;
    postInfo: any;
    isError?: boolean;
    error?: string;
}

const initialState: UsersState = {
    loading: false,
    postInfo: {},
};

const getPost: Function = (draft: any) => {
    draft.isError = false;
    draft.error = '';
    draft.loading = true;
    draft.postInfo = {};
    return draft;
};
const getPostSuccess: Function = (draft: any, postInfo: any) => {
    draft.loading = false;
    draft.postInfo = postInfo;
    return draft;
};
const getPostError: Function = (draft: any, errorObj?: any) => {
    draft.postInfo = {};
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};
export const postReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'POST_INFO':
                return getPost(draft);
            case 'POST_INFO_SUCCESS':
                return getPostSuccess(draft, action.postInfo);
            case 'POST_INFO_ERROR':
                return getPostError(draft, action.error);
            default: return state;
        }
    },
);
