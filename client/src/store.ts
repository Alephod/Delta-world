import { postsReducer } from './reducers/postsReducer';
import { postReducer } from './reducers/postReducer';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { registerReducer } from './reducers/registerReducer';
import { loginReducer } from './reducers/loginReducer';
import { userProfileReducer } from './reducers/userProfileReducer';
import { userUserPostsReducer } from './reducers/userPostsReducer';
import { commentsReducer } from './reducers/commentsReducer';
import { userProfileAvatarReducer } from './reducers/userProfileAvatarReducer';
import { updateReducer } from './reducers/updateUserReducer';
import { uploadReducer } from './reducers/uploadPhotoReducer';
import { usersReducer } from './reducers/usersReducer';
import thunk from 'redux-thunk';


export const store: Store<any> = createStore(
    combineReducers(
        {
            uploadPhoto: uploadReducer,
            comments: commentsReducer,
            postInfo: postReducer,
            userPosts: userUserPostsReducer,
            userProfile: userProfileReducer,
            userProfileAvatar: userProfileAvatarReducer,
            userLogin: loginReducer,
            userRegister: registerReducer,
            userUpdate: updateReducer,
            users: usersReducer,
            posts: postsReducer,
        },
    ),
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
