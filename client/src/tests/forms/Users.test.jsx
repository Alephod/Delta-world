import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import Users from '../../forms/users/Users';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
jest.mock('../../actions/usersAction');
const state = {
    users: {
        usersList: [{ id: '32rfe232gh32r2' }],
        limit: 5,
        page: 0,
        loading: false,
        usersTotal: 1
    },
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('Users form testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Users />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.pagination')).toHaveLength(0);
        expect(wrap.find('.user-card')).toHaveLength(3);
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Users darkTheme/>
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.users').hasClass('users_theme_dark')).toBeTruthy();
    });
});
