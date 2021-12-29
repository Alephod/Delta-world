import { ReactNode, SyntheticEvent, useState } from 'react';
import React from 'react';
import './Helper.scss';

interface Props {
    comment: string;
    themeDark?: boolean;
    children: ReactNode;
    className?: string;
}

export function Helper(props: Props) {
    const [hovered, setHovered] = useState(false);

    function mouseOver (e: SyntheticEvent) {
        setHovered(true);
        e.stopPropagation();
    }
    function mouseOut (e: SyntheticEvent) {
        setHovered(false);
        e.stopPropagation();
    }
    return (
        <div className={`helper ${props.className ? props.className : ''} ${props.themeDark ? 'helper_theme_dark' : ''}`} onMouseOut={mouseOut} onMouseOver={mouseOver}>
            {hovered && <div className="helper__comment">{props.comment}</div>}
            {props.children}
        </div>
    );
}
