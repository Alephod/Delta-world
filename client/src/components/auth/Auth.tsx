import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Auth.scss';
import React from 'react';

interface Props {
    className?: string;
    darkTheme: boolean;
}

export function Auth(props: Props) {
    const { t } = useTranslation();
    return (
        <div className={`auth ${props.className} ${props.darkTheme ? 'auth_theme_dark' : ''}`}>
            <div className="auth__desktop">
                <Link className="auth__link" to="/login">{t('header.auth.login')}</Link>
                <div className="auth__vl"></div>
                <Link className="auth__link" to="/reg">{t('header.auth.registration')}</Link>
            </div>
            <Link className="auth__mobile" to="/login">
                <i className="fas fa-sign-in-alt"></i>
            </Link>
        </div>
    );
}
