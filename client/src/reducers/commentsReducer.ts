import produce from 'immer';

export interface UsersState {
    loading: boolean;
    comments: Array<any>;
    total: number;
    isError?: boolean;
    error?: string;
}

const initialState: UsersState = {
    loading: false,
    comments: [],
    total: 0
};

const getComments: Function = (draft: any) => {
    draft.isError = false;
    draft.error = '';
    draft.loading = true;
    draft.comments = [];
    draft.total = 0;
    return draft;
};
const getCommentsSuccess: Function = (draft: any, commentsObj: any) => {
    draft.loading = false;
    draft.comments = commentsObj.data;
    draft.total = commentsObj.total;
    return draft;
};
const getCommentsError: Function = (draft: any, errorObj?: any) => {
    draft.comments = [];
    draft.total = 0;
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};
export const commentsReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'COMMENTS':
                return getComments(draft);
            case 'COMMENTS_SUCCESS':
                return getCommentsSuccess(draft, action.comments);
            case 'COMMENTS_ERROR':
                return getCommentsError(draft, action.error);
            default: return state;
        }
    },
);
