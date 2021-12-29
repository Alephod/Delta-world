import { mount, configure } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UserProfile from '../../forms/user-profile/UserProfile';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
jest.mock('../../actions/userProfileAction');
const state = {
    userProfile: {
        userInfo: {},
        loading: false
    },
    userPosts: {
        posts: [{ id: 'asdadadasd' }],
        loading: false,
        total: 1
    }
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('UserProfile form testing:', () => {

    test('Render:', () => {
        let wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <UserProfile match={{ params: { id: 'sadasdasdasdsad' } }} />
                </HashRouter>
            </Provider>);
        expect(wrap.find('.user-info__container')).toHaveLength(1);
        expect(wrap.find('.user-posts')).toHaveLength(1);
    });

    test('Render dark theme:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <UserProfile match={{ params: { id: '61b7a78d85f4591902640ad5' } }} darkTheme />
                </HashRouter>
            </Provider>);
        expect(wrap.find('.user-profile').hasClass('user-profile_theme_dark')).toBeTruthy();
    });
});
