import React from 'react';
import { mount, configure } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { UserCard } from '../../components/user-card/UserCard';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('UserCard component testing:', () => {
    test('Render:', () => {
        let wrap = mount(
            <HashRouter>
                <UserCard firstName="name" lastName="lastName" id="asdsadasd" />
            </HashRouter>
        );
        expect(wrap.find('.user-card')).toHaveLength(3);
        expect(wrap.find('.user-card__name').text()).toBe('name lastName');

        wrap = mount(
            <HashRouter>
                <UserCard title="mr" firstName="name" lastName="lastName" id="asdsadasd" />
            </HashRouter>
        );
        expect(wrap.find('.user-card__name').text()).toBe('mr name lastName');
    });
});
