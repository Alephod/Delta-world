import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Footer } from '../../forms/footer/Footer';
configure({ adapter: new Adapter() });
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
describe('Footer form testing:', () => {
    test('Render:', () => {
        const wrap = mount(
            <Footer />
        );
        expect(wrap.find('footer.footer')).toHaveLength(1);
        expect(wrap.find('.footer__container')).toHaveLength(1);
        expect(wrap.find('.footer__copyright')).toHaveLength(1);
    });

    test('Render dark theme:', () => {
        const wrap = mount(<Footer darkTheme />);
        expect(wrap.find('footer.footer').hasClass('footer_theme_dark')).toBeTruthy();
    });

});
