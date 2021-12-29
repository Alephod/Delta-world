import produce from 'immer';


export interface UsersState {
    posts: Array<any>;
    loading: boolean;
    total: number;
    isError?: boolean;
    error?: string;
    errorCode?: string;
}

const initialState: UsersState = {
    posts: [],
    total: 0,
    loading: false,
};

const load: Function = (draft: any) => {
    draft.loading = true;
    draft.isError = false;
    draft.error = '';
    return draft;
};
const loadSuccess: Function = (draft: any, posts: Array<any>, total: number) => {
    draft.posts = posts;
    draft.loading = false;
    draft.total = total;
    return draft;
};
const loadError: Function = (draft: any, errorObj: any) => {
    draft.loading = false;
    draft.posts = [];
    draft.total = 0;
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};


export const userUserPostsReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'GET_USER_POSTS':
                return load(draft);
            case 'GET_USER_POSTS_SUCCESS':
                return loadSuccess(draft, action.posts, action.total);
            case 'GET_USER_POSTS_ERROR':
                return loadError(draft, action.error);
            default: return state;
        }
    },
);
