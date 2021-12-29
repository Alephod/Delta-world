import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Register from '../../forms/register/Register';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
jest.mock('../../actions/registerAction');
const state = {
    userRegister: {
        isLoading: false
    }
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('Register form testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Register />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.auth-form')).toHaveLength(1);
        expect(wrap.find('.auth-form__item')).toHaveLength(6);
    });

    test('Render dark theme:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Register darkTheme />
                </HashRouter>
            </Provider>);
        expect(wrap.find('.auth-form').hasClass('auth-form_theme_dark')).toBeTruthy();
    });
});
