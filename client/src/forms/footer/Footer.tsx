import React from 'react';
import { LanguageSwitcher } from '../../components/language-switcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/theme-switcher/ThemeSwitcher';
import './Footer.scss';

interface Props {
    darkTheme: boolean;
}

export function Footer(props: Props) {
    return (
        <footer className={`footer ${props.darkTheme ? 'footer_theme_dark' : ''}`}>
            <div className="footer__container container">
                <p className="footer__copyright">Delta World &copy; 1970-2077</p>
                <div className='footer__main'>
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
            </div>
        </footer>
    );
}
