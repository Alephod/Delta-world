import { mount, configure } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import { Header } from '../../forms/header/Header';
import Profile from '../../components/profile/Profile';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

jest.mock('../../actions/userProfileAvatarAction');

const state = {
    userProfileAvatar: {
        userInfo: {
            picture: 'any-link',
            firstName: 'Any Name',
            id: '458489894849',
        }
    }
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('Header form testing:', () => {
    test('Render:', () => {
        let wrap = mount(
            <HashRouter>
                <Header />
            </HashRouter>);
        expect(wrap.find('header.header')).toHaveLength(1);
        expect(wrap.find('div.header__main')).toHaveLength(1);
    });
    test('Render profile avatar:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Header login >
                        <Profile />
                    </Header>
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('div.header__profile')).toHaveLength(1);
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <HashRouter>
                <Header darkTheme />
            </HashRouter>);
        expect(wrap.find('header.header').hasClass('header_theme_dark')).toBeTruthy();
    });
});
