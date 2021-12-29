import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loginUserAction } from '../../actions/loginAction';
import { Loader } from '../../components/loader/Loader';
import { NewError } from '../../components/new-error/NewError';

interface Props {
    loading: boolean;
    isError: boolean;
    error: string;
    errorCode: any;
    redirect: boolean;
    darkTheme: boolean;
    loginAction: (id: string) => void;
    setLogin: (state: boolean) => any;
}

function LogIn(props: Props) {
    const [isError, setIsError] = useState(false);
    const [idInput, setIdInput] = useState('');
    const [sendInfo, setSendInfo] = useState(false);
    const id: any = useRef();
    const { t } = useTranslation();


    useEffect(() => {
        if (sendInfo && props.redirect)
            props.setLogin(true);
    }, [sendInfo, props]);
    useEffect(() => {
        setIsError(props.isError);
    }, [props.isError]);
    useEffect(() => {
        document.title = t('login.pageTitle');
        setIsError(false);
    }, []);

    const Login: any = () => {
        setSendInfo(true);
        props.loginAction(idInput);
    };

    return (
        <div className={`auth-form container ${props.darkTheme ? 'auth-form_theme_dark' : ''}`}>
            {props.loading ?
                <Loader /> :
                <div className="auth-form__container container">
                    <h1 className="auth-form__title">{t('login.form.title')}</h1>

                    <div ref={id} className='auth-form__item'>
                        <p className="auth-form__label">{t('login.form.id.label')}</p>
                        <input onInput={(e: any) => {
                            id.current.classList.remove('error');
                            setIdInput(e.target.value);
                        }} className="auth-form__input" placeholder={t('login.form.id.placeholder')} type="text" name="" id="" />
                        <p className="auth-form__error">{t('login.form.id.error')}</p>
                    </div>
                    <div className="auth-form__item">
                        <input onClick={Login} className="auth-form__btn" value={t('login.form.button') as string} type="button" />
                    </div>
                    <p className="auth-form__text">{t('login.form.no-account')} <Link to="/reg">{t('login.form.link')}</Link></p>
                </div>}
            {sendInfo && props.redirect ? <Redirect push from="/login" to={`/user/${idInput}`} /> : null}
            <NewError
                darkTheme={props.darkTheme}
                active={isError}
                setIsError={setIsError}
                title={t('login.error.title')}
                errors={t('login.error.errors')}
                code={props.errorCode}
            />
        </div>
    );
}

export default connect(
    (state: any) => ({
        loading: state.userLogin.loading,
        isError: state.userLogin.isError,
        error: state.userLogin.error,
        errorCode: state.userLogin.errorCode,
        redirect: state.userLogin.redirect,
    }),
    (dispatch) => ({
        loginAction: bindActionCreators(loginUserAction, dispatch),
    }),
)(LogIn);
