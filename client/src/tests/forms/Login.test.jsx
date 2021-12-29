import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { HashRouter } from 'react-router-dom';
import LogIn from '../../forms/log-in/LogIn';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
jest.mock('../../actions/loginAction');
const state = {
    userLogin: {}
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('Login form testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <LogIn />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.auth-form')).toHaveLength(1);
        expect(wrap.find('.auth-form__item')).toHaveLength(2);
    });
});
