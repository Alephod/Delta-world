import React, { useContext, useEffect, useState, Component } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUserInfoAction } from '../../actions/userProfileAction';
import { UserContext } from '../../context/userContext';
import { FormatDate } from '../format-date/formatDate';
import { Loader } from '../loader/Loader';
import UpdateUser from '../update-user/UpdateUser';
import './UserInfo.scss';

interface Props {
    login: boolean;
    loading: boolean;
    userInfo: any;
    darkTheme: boolean;
    load: (id: string) => void;
    userID: string;
}

function UserInfo(props: Props) {
    const [isUpdateUserOpened, setIsUpdateUserOpened] = useState(false);
    const { isUpdated }: any = useContext(UserContext);
    const { t } = useTranslation();

    useEffect(() => {
        isUpdateUserOpened ? document.body.classList.add('body_modal_opened') : document.body.classList.remove('body_modal_opened');
    }, [isUpdateUserOpened]);
    useEffect(() => {
        props.load(props.userID);
    }, [isUpdated]);
    useEffect(() => {
        document.title = `Delta World — ${props.userInfo.firstName} ${props.userInfo.lastName}`;
    }, [props.userInfo]);
    useEffect(() => {
        document.title = t('user-info.pageTitle');
    }, []);
    return (
        <div className={`user-info__container ${props.darkTheme ? 'user-info__container_theme_dark' : ''}`} >
            {props.loading ?
                <Loader /> :
                <div className="user-info__info-container">
                    <div className="user-info__img">
                        <img src={props.userInfo.picture ? props.userInfo.picture : 'https://i.ibb.co/C9DGFQy/no-avatar.webp'} alt="" />
                    </div>
                    <div className="user-info__user-info">
                        <h2 className="user-info__name">
                            {`${props.userInfo.firstName} ${props.userInfo.lastName}`}
                        </h2>
                        <p className="user-info__item">
                            <span>{t('user-info.gender')} </span>
                            {props.userInfo.gender ?
                                props.userInfo.gender === 'male' ?
                                    t('gender.man') : t('gender.woman')
                                : t('user-info.undefined')
                            }
                        </p>
                        <p className="user-info__item">
                            <span>{t('user-info.dateOfBirth')}</span>
                            {props.userInfo.dateOfBirth ?
                                <FormatDate
                                    date={new Date(props.userInfo.dateOfBirth)}
                                    formatYear
                                /> : t('user-info.undefined')}
                        </p>
                        <p className="user-info__item">
                            <span>{t('user-info.dateOfRegistration')}</span>
                            <FormatDate
                                date={new Date(props.userInfo.dateOfBirth)}
                                formatYear
                            />
                        </p>
                        <p className="user-info__item">
                            <span>{t('user-info.email')}</span>
                            {props.userInfo.email}
                        </p>
                        <p className="user-info__item">
                            <span>{t('user-info.phone')}</span>
                            {props.userInfo.phone ? props.userInfo.phone : t('user-info.undefined')}
                        </p>
                        <p className="user-info__item_id">
                            <span>ID: </span>
                            {props.userInfo.id}
                        </p>

                    </div>
                    {props.login && props.userInfo.id === JSON.parse(localStorage.getItem('user') as string).id ?
                        <div className="user-info__edit">
                            <div onClick={() => setIsUpdateUserOpened(true)} className="user-info__edit-container">
                                <i className="far fa-edit"></i>
                                <span>{t('user-info.edit-profile')}</span>
                            </div>
                        </div>
                        : null
                    }
                </div>
            }
            {isUpdateUserOpened ?
                <UpdateUser darkTheme={props.darkTheme} userInfo={props.userInfo} setIsUpdateUserOpened={setIsUpdateUserOpened} /> : null
            }
        </div>
    );
}
export default connect(
    (state: any) => ({
        userInfo: state.userProfile.userInfo,
        loading: state.userProfile.loading,
        isError: state.userProfile.isError,
        error: state.userProfile.error,
        errorCode: state.userProfile.errorCode,
    }),
    (dispatch) => ({
        load: bindActionCreators(loadUserInfoAction, dispatch),
    }),
)(UserInfo);
