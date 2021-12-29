import { DatePicker } from 'antd';
import moment from 'moment';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserAction } from '../../actions/updateUserAction';
import { UserContext } from '../../context/userContext';
import { Dropdown } from '../dropdown/Dropdown';
import { Loader } from '../loader/Loader';
import { NewError } from '../new-error/NewError';
import UploadPhoto from '../upload-photo/UploadPhoto';
import './UpdateUser.scss';

interface Props {
    userInfo: any;
    loading: boolean;
    newUserInfo: any;
    isError: boolean;
    error: string;
    errorCode: any;
    darkTheme: boolean;
    setIsUpdateUserOpened: (state: boolean) => void;
    update: (id: string, newUserInfo: any) => void;
}

function UpdateUser(props: Props) {
    const { userUpdated, userUpdatedFalse }: any = useContext(UserContext);

    const [isUpdatePhoto, setIsUpdatePhoto] = useState(false);
    const [isError, setIsError] = useState(false);

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null as unknown as any);
    const [phone, setPhone] = useState('');

    const { t } = useTranslation();

    const nameInput: any = useRef();
    const phoneInput: any = useRef();

    useEffect(() => {
        setIsError(props.isError);
    }, [props.isError]);
    useEffect(() => {
        if (!props.loading)
            userUpdated();
        else
            userUpdatedFalse();
    }, [props.loading]);

    useEffect(() => {
        setImage(props.userInfo.picture ? props.userInfo.picture : 'https://i.ibb.co/C9DGFQy/no-avatar.webp');
        setName(`${props.userInfo.firstName} ${props.userInfo.lastName}`);
        setGender(props.userInfo.gender === 'male' ? t('gender.man') : t('gender.woman'));
        setDateOfBirth(moment(new Date(props.userInfo.dateOfBirth)));
        setPhone(props.userInfo.phone);
    }, [props]);


    const updateInfo: any = () => {
        let user: any = {
            picture: image,
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            gender: gender === ('Мужской' || 'Male') ? 'male' : 'female',
            dateOfBirth: dateOfBirth,
            phone: phone
        };

        let isValidName: boolean = true;
        let isValidPhone: boolean = true;

        let nameArr: Array<string> = name.trim().split(' ');

        // Валидация имени
        if (name.trim() === '') {
            nameInput.current.classList.add('error');
            isValidName = false;
        } else if (!nameArr[1]) {
            nameInput.current.querySelector('.update-user__error').textContent = 'Необходимо ввести имя и фамилию';
            nameInput.current.classList.add('error');
            isValidName = false;
        } else if (nameArr[0].length < 2 || nameArr[1].length < 2) {
            nameInput.current.querySelector('.update-user__error').textContent = 'Имя и фамилия должны быть не короче 2 символов';
            nameInput.current.classList.add('error');
            isValidName = false;
        } else isValidName = true;

        // Валидация номера телефона
        if (phone === '') {
            user.phone = undefined;
        }
        if (phone) {
            if (phone.length < 5) isValidPhone = false;
            phoneInput.current.classList.add('error');
        } else
            isValidPhone = true;

        if (isValidName && isValidPhone) {
            props.update(props.userInfo.id, user);
            userUpdatedFalse();
        }
    };
    const deletePhoto: any = () => {
        setImage('https://i.ibb.co/C9DGFQy/no-avatar.webp');
    };

    return (
        <div className={`update-user ${props.darkTheme ? 'update-user_theme_dark' : ''}`}>
            <div onClick={() => props.setIsUpdateUserOpened(false)} className={`update-user__close-btn ${isUpdatePhoto ? 'update-user__close-btn_upload-photo' : ''}`}>
                <span></span>
                <span></span>
            </div>
            <div className={`update-user__contanier ${isUpdatePhoto ? 'update-user__contanier_upload-photo' : ''}`}>
                {props.loading ? <Loader /> :
                    <div className="update-user__inner">
                        <div className="update-user__img">
                            <img src={image} alt="" />
                        </div>
                        <div className="update-user__img-options">
                            <button onClick={() => setIsUpdatePhoto(true)} className="update-user__img-option">{t('update-user.form.photo.upload')}</button>
                            <div className="update-user__vl"></div>
                            <button onClick={deletePhoto} className="update-user__img-option">{t('update-user.form.photo.delete')}</button>
                        </div>
                        <div className="update-user__params">
                            <div ref={nameInput} className="update-user__params-item">
                                <div className="update-user__params-item-container">
                                    <span className="update-user__title">{t('update-user.form.name.label')}</span>
                                    <input className="update-user__input" value={name} onInput={(e: any) => {
                                        setName(e.target.value);
                                        nameInput.current.classList.remove('error');
                                    }} />
                                </div>
                                <p className="update-user__error">{t('update-user.form.name.error')}</p>
                            </div>
                            <div className="update-user__params-item">
                                <div className="update-user__params-item-container">
                                    <span className="update-user__title">{t('update-user.form.gender.label')}</span>
                                    <Dropdown darkTheme={props.darkTheme} defaultValue={gender} setOption={setGender} options={[t('gender.man'), t('gender.woman')]} />
                                </div>
                            </div>
                            <div className="update-user__params-item">
                                <div className="update-user__params-item-container">
                                    <span className="update-user__title">{t('update-user.form.dateOfBirth.label')}</span>
                                    <DatePicker
                                        className="update-user__input"
                                        value={moment(new Date(dateOfBirth)) ? moment(new Date(dateOfBirth)) : undefined}
                                        onChange={(date, dateString) => setDateOfBirth(
                                            [dateString.split('.')[1], dateString.split('.')[0], dateString.split('.')[2]].join('/')
                                        )}
                                        disabledDate={(current: any) => {
                                            return current && current > moment().endOf('day');
                                        }}
                                        placeholder={t('update-user.form.dateOfBirth.placeholder')}
                                        format={['DD.MM.YYYY', 'DD.MM.YY']}
                                    />
                                </div>
                            </div>
                            <div ref={phoneInput} className="update-user__params-item">
                                <div className="update-user__params-item-container">
                                    <span className="update-user__title">{t('update-user.form.phone.label')}</span>
                                    <input className="update-user__input" onInput={(e: any) => {
                                        setPhone(e.target.value.replace(/[^\d]/g, ''));
                                        phoneInput.current.classList.remove('error');
                                    }} value={phone} />
                                </div>
                                <p className="update-user__error">{t('update-user.form.phone.error')}</p>
                            </div>
                            <div className="update-user__params-item">
                                <div className="update-user__params-item-container">
                                    <span className="update-user__title">{t('update-user.form.dateOfRegistration')}</span>
                                    <DatePicker
                                        disabled
                                        className="update-user__input"
                                        defaultValue={moment(new Date(props.userInfo.registerDate))}
                                        onChange={(date, dateString) => setDateOfBirth(
                                            [dateString.split('.')[1], dateString.split('.')[0], dateString.split('.')[2]].join('/')
                                        )}
                                        disabledDate={(current: any) => {
                                            return current && current > moment().endOf('day');
                                        }}
                                        placeholder="ДД.ММ.ГГГГ"
                                        format={['DD.MM.YYYY', 'DD.MM.YY']}
                                    />
                                </div>
                            </div>
                            <div className="update-user__params-item">
                                <div className="update-user__params-item-container">
                                    <span className="update-user__title">{t('update-user.form.email')}</span>
                                    <input className="update-user__input" disabled defaultValue={props.userInfo.email} />
                                </div>
                            </div>
                        </div>
                        <button className="update-user__btn" onClick={updateInfo}>{t('update-user.form.button')}</button>
                    </div>
                }
            </div>
            {isUpdatePhoto ? <UploadPhoto darkTheme={props.darkTheme} setIsUploadPhoto={setIsUpdatePhoto} setImage={setImage} /> : null}
            <NewError
                darkTheme={props.darkTheme}
                active={isError}
                setIsError={setIsError}
                title={t('update-user.error.title')}
                errors={props.error}
                code={props.errorCode}
            />
        </div>
    );
}
export default connect(
    (state: any) => ({
        loading: state.userUpdate.loading,
        newUserInfo: state.userUpdate.newUserInfo,
        isError: state.userUpdate.isError,
        error: state.userUpdate.error,
        errorCode: state.userUpdate.errorCode,
    }),
    (dispatch) => ({
        update: bindActionCreators(updateUserAction, dispatch),
    }),
)(UpdateUser);
