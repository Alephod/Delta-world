import React from 'react';
import { mount, configure } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { CommentCard } from '../../components/comment-card/CommentCard';

configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

describe('CommentCard component testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <HashRouter>
                <CommentCard text="Текст" name="Полное Имя" />
            </HashRouter>
        );
        expect(wrap.find('.comment-card')).toHaveLength(1);
        expect(wrap.find('.comment-card__text').text()).toBe('Текст');
        expect(wrap.find('a.comment-card__name').text()).toBe('Полное Имя');
    });
    test('Render dark theme:', () => {
        const wrap = mount(
            <HashRouter>
                <CommentCard darkTheme />
            </HashRouter>);
        expect(wrap.find('.comment-card').hasClass('comment-card_theme_dark')).toBeTruthy();
    });
});
