import { useTranslation } from 'react-i18next';
import React from 'react';
import './NewError.scss';

interface Props {
    title: string;
    code: string;
    active: boolean;
    errors: any | '';
    darkTheme: boolean;
    setIsError: (state: boolean) => void;
}

export function NewError(props: Props) {
    const { t } = useTranslation();
    const closeError: any = () => {
        props.setIsError(false);
    };

    props.active ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'scroll';
    return (

        <div className={`new-error ${props.active ? 'new-error_active' : ''} ${props.darkTheme ? 'new-error_theme_dark' : ''}`}>
            <div className="new-error__container">
                <div onClick={closeError} className="new-error__close-btn">
                    <span></span>
                    <span></span>
                </div>
                <h2 className="new-error__title">{props.title}</h2>
                {props.errors ?
                    typeof props.errors === 'string' ?
                        <p className="new-error__list-item">{props.errors}</p> :
                        Object.values(props.errors).map((item: any) => <p key={item} className="new-error__list-item">{item}</p>) :
                    null}
                <p className="new-error__code">{t('error-code')} {props.code}</p>
                <button onClick={closeError} className="new-error__ok-btn">OK</button>
            </div>
        </div>
    );
}
