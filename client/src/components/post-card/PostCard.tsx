import { Helper } from '../../wrappers/helper/Helper';
import { FormatDate } from '../format-date/formatDate';
import React from 'react';
import './PostCard.scss';

interface Props {
    href: string;
    id: string;
    darkTheme: boolean;
    text: string;
    type?: string;
    owner?: any;
    publishDate?: any;
    openPost: (id: string, state: boolean) => void;
}

export function PostCard(props: Props) {
    return (
        <div onClick={() => props.openPost(props.id, true)} className={`post-card ${props.darkTheme ? 'post-card_theme_dark' : ''}`}>
            {props.type === 'posts' ?
                <div className="post-card__author">
                    <img className="post-card__avatar" src={props.owner.picture} alt="" />
                    <div className="post-card__info">
                        <Helper className="post-card__helper" themeDark={props.darkTheme} comment={props.id}>
                            <p className="post-card__name">
                                {`${props.owner.title ? props.owner.title : ''} ${props.owner.firstName} ${props.owner.lastName}`}
                            </p>
                        </Helper>

                        <p className="post-card__date">
                            <FormatDate date={new Date(props.publishDate)} formatTime />
                        </p>
                    </div>
                </div> : null
            }
            <div className="post-card__img">
                <img src={props.href} alt="" />
            </div>
            <p className="post-card__text">{props.text}</p>
        </div>
    );
}
