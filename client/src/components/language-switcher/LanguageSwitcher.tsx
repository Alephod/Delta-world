import i18next from 'i18next';
import './LanguageSwitcher.scss';
import ru from './../../img/language-switcher/russian.png';
import en from './../../img/language-switcher/english.png';
import React from 'react';

export function LanguageSwitcher() {
    return (
        <div className='language-switcher'>
            <div className='language-switcher__btn' onClick={() => i18next.changeLanguage('en')}>
                <img src={en} alt="" />
            </div>
            <div className='language-switcher__btn' onClick={() => i18next.changeLanguage('ru')}>
                <img src={ru} alt="" />
            </div>
        </div>
    );
}
