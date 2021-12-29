import produce from 'immer';


export interface UsersState {
    usersList: Array<any>;
    usersTotal: number;
    loading: boolean;
    isError?: boolean;
    error?: string;
    errorCode?: string;
}

const initialState: UsersState = {
    usersList: [],
    usersTotal: 0,
    loading: true,
};

const load: Function = (draft: any) => {
    draft.loading = true;
    draft.isError = false;
    draft.error = '';
    return draft;
};
const loadSuccess: Function = (draft: any, usersList?: Array<any>, usersTotal?: number) => {
    draft.loading = false;
    draft.usersList = usersList || [];
    draft.usersTotal = usersTotal || 0;
    return draft;
};

const loadError: Function = (draft: any, errorObj: any) => {
    draft.usersList = [];
    draft.usersTotal = 0;
    draft.loading = false;
    draft.isError = true;
    draft.error = errorObj.data;
    draft.errorCode = errorObj.error;
    return draft;
};

export const usersReducer: any = (state = initialState, action: any) => produce(
    state,
    (draft: any) => {
        switch (action.type) {
            case 'LOAD_USERS':
                return load(draft);
            case 'LOAD_USERS_SUCCESS':
                return loadSuccess(draft, action.usersList, action.usersTotal);
            case 'LOAD_USERS_ERROR':
                return loadError(draft, action.usersList, action.usersTotal);
            default: return state;
        }
    },
);
