import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';
import './ThemeSwitcher.scss';

export function ThemeSwitcher() {
    const {toggleTheme, darkTheme} = useContext(ThemeContext);
    const { t } = useTranslation();
    return (
        <div onClick={toggleTheme} className={`theme-switcher ${darkTheme ? 'theme-switcher_checked theme-switcher_theme_dark' : ''}`}>
            <label className="theme-switcher__label" htmlFor="theme-switcher">{t('footer.dark-theme')}</label>
            <div className="theme-switcher__custom-checkbox">
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
