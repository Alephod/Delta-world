import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Auth } from '../../components/auth/Auth';
import { Logo } from '../../components/logo/Logo';
import Profile from '../../components/profile/Profile';
import { UserContext } from '../../context/userContext';
import './Header.scss';

interface Props {
    isUpdated: boolean;
    userLogout: () => void;
    login: boolean;
    darkTheme: boolean;
}

export function Header(props: Props) {
    const { isUpdated, setLogin } = useContext(UserContext);
    const { t } = useTranslation();

    useEffect(() => {
        props.darkTheme ? document.body.classList.add('body_theme_dark') : document.body.classList.remove('body_theme_dark');
    }, [props.darkTheme]);

    return (
        <header className={`header ${props.darkTheme ? 'header_theme_dark' : ''}`}>
            <div className="header__container container">
                <div className="header__main">
                    <Link to="/users" className="header__link">
                        <i className="fas fa-user-friends"></i>
                        <span>{t('header.pages.users')}</span>
                    </Link>
                    <Link to="/posts" className="header__link">
                        <i className="fas fa-images"></i>
                        <span>{t('header.pages.posts')}</span>
                    </Link>
                </div>
                {props.login ?
                    <Profile darkTheme={props.darkTheme} className="header__profile" isUpdated={isUpdated} setLogin={setLogin} />
                    : <Auth darkTheme={props.darkTheme} className="header__auth" />
                }
            </div>
        </header>
    );
}
