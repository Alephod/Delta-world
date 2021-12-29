import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { loadUserAvatarInfoAction } from '../../actions/userProfileAvatarAction';
import './Profile.scss';

interface Props {
    setLogin: (state: boolean) => void;
    href: string | '';
    name: string | '';
    id: string;
    isUpdated: boolean;
    className?: string;
    darkTheme: boolean;
    load: (id: string) => void;
}

function Profile(props: Props) {
    const { t } = useTranslation();
    useEffect(() => {
        localStorage.getItem('user') && props.load(JSON.parse(localStorage.getItem('user') as string).id);
    }, [props.isUpdated]);

    return (
        <div className={`profile ${props.className} ${props.darkTheme ? 'profile_theme_dark' : ''}`}>
            <div className="profile__desktop">
                <Link className="profile__link"
                    to={localStorage.getItem('user') ?
                        `/user/${JSON.parse(localStorage.getItem('user') as string).id}` :
                        '/user/'
                    }
                >
                    <div className="profile__container">
                        <div className="profile__img">
                            <img src={props.href ? props.href : 'https://i.ibb.co/C9DGFQy/no-avatar.webp'} alt="" />
                        </div>
                        <span className="profile__name">{props.name}</span>
                    </div>
                </Link>
                <div className="profile__vl"></div>
                <Link className="profile__link" onClick={() => {
                    localStorage.setItem('user', JSON.stringify({ id: '', auth: false }));
                    props.setLogin(false);
                }} to="/login">{t('header.profile.logout')}</Link>
            </div>
            <Link className="profile__mobile" onClick={() => {
                localStorage.setItem('user', JSON.stringify({ id: '', auth: false }));
                props.setLogin(false);
            }} to="/login">
                <i className="fas fa-sign-out-alt"></i>
            </Link>
        </div>
    );
}
export default connect(
    (state: any) => ({
        href: state.userProfileAvatar.userInfo.picture,
        name: state.userProfileAvatar.userInfo.firstName,
        id: state.userProfileAvatar.userInfo.id,
    }),
    (dispatch) => ({
        load: bindActionCreators(loadUserAvatarInfoAction, dispatch),
    }),
)(Profile);
