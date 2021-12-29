import { Link } from 'react-router-dom';
import './Logo.scss';
import React from 'react';


interface Props {
    className?: string;
}

export function Logo(props: Props) {
    return (
        <Link to="/posts" className={`logo ${props.className}`}>
            <span>Delta World</span>
        </Link>
    );
}
