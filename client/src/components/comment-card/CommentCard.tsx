import { Link } from 'react-router-dom';
import './CommentCard.scss';
import React from 'react';

interface Props {
    href: string;
    text: string;
    name: string;
    date: any;
    userID: string;
    darkTheme: boolean;
}

export function CommentCard(props: Props) {
    return (
        <div className={`comment-card ${props.darkTheme ? 'comment-card_theme_dark' : ''}`}>
            <div className="comment-card__img">
                <Link to={`/user/${props.userID}`}>
                    <img src={props.href} alt="" />
                </Link>
            </div>
            <div className="comment-card__main">
                <div className="comment-card__header">
                    <Link className="comment-card__name" to={`/user/${props.userID}`}>
                        {props.name}
                    </Link>
                    <p className="comment-card__date">{props.date}</p>
                </div>
                <p className="comment-card__text">{props.text}</p>
            </div>
        </div>
    );
}
