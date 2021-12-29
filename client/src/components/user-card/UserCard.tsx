import { Link } from 'react-router-dom';
import { Helper } from '../../wrappers/helper/Helper';
import React from 'react';

import './UserCard.scss';

interface Props {
    href: string;
    title?: string;
    firstName: string;
    lastName: string;
    id: string;
    darkTheme: boolean;
}

export function UserCard(props: Props) {
    return (
        <Link to={`/user/${props.id}`} className={`user-card ${props.darkTheme ? 'user-card_theme_dark' : ''}`}>
            <div className="user-card__img">
                <img src={props.href ? props.href : 'https://i.ibb.co/C9DGFQy/no-avatar.webp'} alt="" />
            </div>
            <Helper comment={props.id} themeDark={props.darkTheme}>
                <p className="user-card__name">
                    {`${props.title ? props.title + ' ' : ''}${props.firstName} ${props.lastName}`}
                </p>
            </Helper>

        </Link>
    );
}
