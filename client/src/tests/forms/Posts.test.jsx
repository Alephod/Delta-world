import { mount, configure } from 'enzyme';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import Posts from '../../forms/posts/Posts';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
const state = {
    posts: {
        posts: [{
            id: '32rfe232gh32r2',
            picture: 'url',
            text: 'lorem ipsum dolor',
            publishDate: '1972-08-07T22:16:47.420Z',
            owner: {
                id: '32rfe232gh',
                picture: 'url',
                title: 'male',
                fullName: 'Ferdinand Ellington'
            }
        }],
        limit: 5,
        page: 0,
        loading: false,
        total: 1
    },
};
jest.mock('../../actions/postsAction');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('Posts form testing:', () => {
    test('Render:', () => {


        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Posts />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.pagination')).toHaveLength(0);
        expect(wrap.find('.post-card')).toHaveLength(1);
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Posts darkTheme/>
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.posts').hasClass('posts_theme_dark')).toBeTruthy();
    });
});
