import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadPhotoAction } from '../../actions/uploadPhotoAction';
import { Loader } from '../loader/Loader';
import { NewError } from '../new-error/NewError';
import './UploadPhoto.scss';


interface Props {
    className?: string;
    href: string;
    loading: boolean;
    isError: boolean;
    error: string;
    errorCode: string;
    darkTheme: boolean;
    setIsUploadPhoto: (state: boolean) => void;
    setImage: (state: string) => void;
    upload: (file: File) => void;
}

function UploadPhoto(props: Props) {
    const [isError, setIsError] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const input: any = useRef();
    const { t } = useTranslation();

    useEffect(() => {
        if (props.href && isSend) {
            props.setImage(props.href);
            props.setIsUploadPhoto(false);
        }
    }, [props.href]);
    useEffect(() => {
        setIsError(props.isError);
    }, [props.isError]);
    return (
        <div className={`upload-photo ${props.className ? props.className : ''} ${props.darkTheme ? 'upload-photo_theme_dark' : ''}`}>
            {props.loading ?
                <Loader /> :
                <div className="upload-photo__container">
                    <div onClick={() => props.setIsUploadPhoto(false)} className="upload-photo__close-btn">
                        <span></span>
                        <span></span>
                    </div>
                    <p className="upload-photo__title">{t('upload-photo.title')}</p>
                    <input ref={input} className="upload-photo__input" type="file" name="" id="" />
                    <div className="upload-photo__footer">
                        <button onClick={() => {
                            props.upload(input.current.files[0]);
                            setIsSend(true);
                        }}>{t('upload-photo.button')}</button>
                    </div>
                </div>
            }
            <NewError
                darkTheme={props.darkTheme}
                active={isError}
                setIsError={setIsError}
                title={t('upload-photo.error.title')}
                errors={props.error}
                code={props.errorCode}
            />
        </div>
    );
}
export default connect(
    (state: any) => ({
        href: state.uploadPhoto.href,
        loading: state.uploadPhoto.loading,
        isError: state.uploadPhoto.isError,
        error: state.uploadPhoto.error,
        errorCode: state.uploadPhoto.errorCode,
    }),
    (dispatch) => ({
        upload: bindActionCreators(uploadPhotoAction, dispatch),
    }),
)(UploadPhoto);
