import { mount, configure } from 'enzyme';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import Comments from '../../components/comments/Comments';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
const state = {
    comments: {
        comments: [{
            id: '32rfe232gh32r2',
            owner: {
                id: 'asdasdasdadasd'
            }
        }],
        limit: 5,
        page: 0,
        loading: false,
        total: 1
    },
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('Comments form testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Comments />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.pagination')).toHaveLength(0);
        expect(wrap.find('.comment-card')).toHaveLength(1);
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Comments darkTheme />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.comments').hasClass('comments_theme_dark')).toBeTruthy();
    });
});
