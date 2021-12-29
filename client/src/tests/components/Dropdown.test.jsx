import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Dropdown } from '../../components/dropdown/Dropdown';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('Dropdown component testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <Dropdown options={['Some option', 'Second option']}/>
        );
        expect(wrap.find('.dropdown')).toHaveLength(1);
        expect(wrap.find('.dropdown__item')).toHaveLength(2);
        expect(wrap.find('.dropdown__item').first().text()).toBe('Some option');
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <Dropdown options={['Some option', 'Second option']} darkTheme/>
        );
        expect(wrap.find('.dropdown').hasClass('dropdown_theme_dark')).toBeTruthy();
    });
});
