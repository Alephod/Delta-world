import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { NewError } from '../../components/new-error/NewError';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('NewError component testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <NewError title='Any title' code='520'/>
        );
        expect(wrap.find('.new-error')).toHaveLength(1);
        expect(wrap.find('.new-error__title').text()).toBe('Any title');
        expect(wrap.find('.new-error__code').text()).toBe('error-code 520');
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <NewError title='Any title' code='520' darkTheme/>
        );
        expect(wrap.find('.new-error').hasClass('new-error_theme_dark')).toBeTruthy();
    });
});
