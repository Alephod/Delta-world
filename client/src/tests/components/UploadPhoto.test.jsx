import { mount, configure } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import UploadPhoto from '../../components/upload-photo/UploadPhoto';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

jest.mock('../../actions/uploadPhotoAction');

const state = {
    uploadPhoto: {
        href: 'url',
        loading: false
    }
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(state);
store.dispatch = jest.fn();

describe('UploadPhoto component testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <UploadPhoto />
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.upload-photo__input')).toHaveLength(1);
        expect(wrap.find('.upload-photo')).toHaveLength(1);
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <Provider store={store}>
                <HashRouter>
                    <UploadPhoto darkTheme/>
                </HashRouter>
            </Provider>
        );
        expect(wrap.find('.upload-photo').hasClass('upload-photo_theme_dark')).toBeTruthy();
    });
});
