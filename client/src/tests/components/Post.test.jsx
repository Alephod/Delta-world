import { mount, configure } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Post from '../../components/post/Post';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

jest.mock('../../actions/postAction');
const state = {
    postInfo: {
        postInfo: {},
        loading: false
    },
    comments: {
        loading: false,
        comments: [{
            owner: { id: 'sadasdadads' }
        }],
        total: 1
    }
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('Post component testing:', () => {
    test('Render:', () => {
        let wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Post />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.post')).toHaveLength(1);
        expect(wrap.find('.post__header')).toHaveLength(1);
        expect(wrap.find('.post__body')).toHaveLength(1);
        expect(wrap.find('.post__comments')).toHaveLength(1);
    });

    test('Render dark theme:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <Post darkTheme/>
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.post').hasClass('post_theme_dark')).toBeTruthy();
    });
});
