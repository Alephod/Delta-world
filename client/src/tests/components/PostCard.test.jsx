import React from 'react';
import { mount, configure } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { PostCard } from '../../components/post-card/PostCard';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('PostCard component testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <HashRouter>
                <PostCard href="url" text="Текст" />
            </HashRouter>
        );
        expect(wrap.find('.post-card')).toHaveLength(1);
        expect(wrap.find('.post-card__text').text()).toBe('Текст');
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <HashRouter>
                <PostCard href="url" text="Текст" darkTheme/>
            </HashRouter>);
        expect(wrap.find('.post-card').hasClass('post-card_theme_dark')).toBeTruthy();
    });
});
