import 'antd/dist/antd.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNewUserAction } from '../../actions/registerAction';
import React, { useEffect, useRef, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/ru';
import { Loader } from '../../components/loader/Loader';
import { NewError } from '../../components/new-error/NewError';
import { useTranslation } from 'react-i18next';
import { dateOfBirthValid, emailValid, genderValid, nameValid, phoneValid } from '../../utils/validation';

interface Props {
    redirect: boolean;
    userID: string;
    loading: boolean;
    isError: boolean;
    error: string;
    errorCode: string;
    setLogin: (state: boolean) => void;
    addUser: (user: object) => void;
    darkTheme: boolean;
}


function Register(props: Props) {
    const [phoneInput, setPhoneInput] = useState('');
    const [radioChecked, setRadioChecked] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [isError, setIsError] = useState(false);
    const [sendInfo, setSendInfo] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        sendInfo && props.redirect ? props.setLogin(true) : null;
    }, [sendInfo, props]);
    useEffect(() => {
        setIsError(props.isError);
    }, [props.isError]);
    useEffect(() => {
        document.title = t('registration.pageTitle');
        setIsError(false);
    }, []);

    const name: any = useRef();
    const email: any = useRef();
    const phone: any = useRef();
    const birth: any = useRef();
    const dateOfBirthForm: any = useRef();

    const SendInfo: any = () => {
        const user: any = {
            firstName: name.current.querySelector('input').value.trim().split(' ')[0],
            lastName: name.current.querySelector('input').value.trim().split(' ')[1] || '',
            email: email.current.querySelector('input').value,
            gender: radioChecked === ('Мужчина' || 'Male') ? 'male' : 'female',
            phone: phoneInput,
            dateOfBirth: dateOfBirth,
            registerDate: new Date()
        };
        let isValidName: boolean = true;
        let isValidEmail: boolean = false;
        let isValidPhone: boolean = true;
        let isValidBirthDay: boolean = true;

        let emailStr: string = email.current.querySelector('input').value;

        // Валидация email
        if (!emailValid(emailStr)) {
            email.current.classList.add('error');
            isValidEmail = false;
        } else isValidEmail = true;

        // Валидация имени
        switch (nameValid(name.current.querySelector('input').value)) {
            case true:
                isValidName = true;
                break;
            case 'no-name':
                name.current.classList.add('error');
                isValidName = false;
                break;
            case 'no-lastname':
                name.current.querySelector('.auth-form__error').textContent = t('registration.form.name.error--expected-firstname-and-lastname');
                name.current.classList.add('error');
                isValidName = false;
                break;
            case 'less-2-symbols':
                name.current.querySelector('.auth-form__error').textContent = t('registration.form.name.error--name-must-more-2-symbols');
                name.current.classList.add('error');
                isValidName = false;
                break;
            default:
                break;
        }

        // Валидация номера телефона
        if (phoneValid(phoneInput)) {
            isValidPhone = true;
        } else if (phoneValid(phoneInput) === false) {
            isValidPhone = false;
            phone.current.classList.add('error');
        } else if (phoneValid(phoneInput) === undefined) {
            user.phone = undefined;
        }

        // Валидация даты рождения
        if (dateOfBirthValid(dateOfBirth)) {
            isValidBirthDay = true;
        } else {
            isValidBirthDay = false;
            dateOfBirthForm.current.classList.add('error');
        }

        // Валидация пола
        user.gender = genderValid(radioChecked);

        if (isValidEmail && isValidName && isValidPhone && isValidBirthDay) {
            props.addUser(user);
            setSendInfo(true);
        }
    };

    return (
        <div className={`auth-form container ${props.darkTheme ? 'auth-form_theme_dark' : ''}`}>
            {props.loading ?
                <Loader /> :
                <div className="auth-form__container container">
                    <h1 className="auth-form__title">{t('registration.form.title')}</h1>
                    <div ref={name} className='auth-form__item'>
                        <p className="auth-form__label">{t('registration.form.name.label')} <sup className="auth-form__required">*</sup></p>
                        <input onInput={() => name.current.classList.remove('error')} className="auth-form__input" placeholder={t('registration.form.name.placeholder')} type="text" name="" id="" />
                        <p className="auth-form__error">{t('registration.form.name.error')}</p>
                    </div>
                    <div ref={email} className='auth-form__item'>
                        <p className="input__label">{t('registration.form.email.label')} <sup className="auth-form__required">*</sup></p>
                        <input onInput={() => email.current.classList.remove('error')} className="auth-form__input" placeholder="anonim@example.com" type="text" />
                        <p className="auth-form__error">{t('registration.form.email.error')}</p>
                    </div>
                    <div ref={dateOfBirthForm} className='auth-form__item'>
                        <p className="auth-form__label">{t('registration.form.dateOfBirth.label')} <sup className="auth-form__required">*</sup></p>
                        <DatePicker
                            className="auth-form__datepicker"
                            onChange={(date, dateString) => {
                                setDateOfBirth([dateString.split('.')[1], dateString.split('.')[0], dateString.split('.')[2]].join('/'));
                                dateOfBirthForm.current.classList.remove('error');
                            }}
                            ref={birth}
                            disabledDate={(current: any) => {
                                return current && current > moment().endOf('day');
                            }}
                            placeholder={t('registration.form.dateOfBirth.placeholder')}
                            format={['DD.MM.YYYY', 'DD.MM.YY']}
                        />
                        <p className="auth-form__error">{t('registration.form.dateOfBirth.error')}</p>
                    </div>
                    <div className="auth-form__item">
                        <p className="auth-form__label">{t('registration.form.gender.label')}</p>
                        <div className="auth-form__options">
                            {[t('registration.form.gender.man'), t('registration.form.gender.woman')].map((item: any) =>
                                <div onClick={() => setRadioChecked(item)} key={item} className="auth-form__option">
                                    <input onChange={() => { }} checked={radioChecked === item ? true : false} type="checkbox" name={item} id="" />
                                    <div className="auth-form__custom-checkbox">
                                        <div></div>
                                    </div>
                                    <label htmlFor={item}>{item}</label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div ref={phone} className="auth-form__item">
                        <p className="auth-form__label">{t('registration.form.phone.label')}</p>
                        <input
                            className="auth-form__input"
                            value={phoneInput}
                            onInput={(e: any) => {
                                setPhoneInput(e.target.value.replace(/[^\d]/g, ''));
                                phone.current.classList.remove('error');
                            }}
                            placeholder="+79991234567"
                            type="text"
                        />
                        <p className="auth-form__error">{t('registration.form.phone.error')}</p>
                    </div>
                    <div className="auth-form__item">
                        <input onClick={SendInfo} className="auth-form__btn" value={t('registration.form.button') as string} type="button" />
                    </div>

                    <p className="auth-form__text">{t('registration.form.has-account')} <Link to="/login">{t('registration.form.link')}</Link></p>
                </div>}
            <NewError
                darkTheme={props.darkTheme}
                active={isError}
                setIsError={setIsError}
                title={t('registration.error.title')}
                errors={props.error}
                code={props.errorCode}
            />
            {sendInfo && props.redirect ? <Redirect from="/reg" to={`/user/${props.userID}`} /> : null}
        </div>
    );
}
export default connect(
    (state: any) => ({
        loading: state.userRegister.loading,
        isError: state.userRegister.isError,
        error: state.userRegister.error,
        errorCode: state.userRegister.errorCode,
        redirect: state.userRegister.redirect,
        userID: state.userRegister.userID
    }),
    (dispatch) => ({
        addUser: bindActionCreators(addNewUserAction, dispatch),
    }),
)(Register);
