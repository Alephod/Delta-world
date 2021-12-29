import { useState } from 'react';
import './Dropdown.scss';
import React from 'react';


interface Props {
    options: Array<string>;
    defaultValue: string;
    className?: string;
    darkTheme: boolean;
    setOption: (state: string) => void;
}

export function Dropdown(props: Props) {
    const [option, setOption] = useState('');
    const [active, setActive] = useState(false);

    const openOptions: any = () => setActive(!active);

    return (
        <div className={`dropdown ${active ? 'dropdown_active' : ''} ${props.darkTheme ? 'dropdown_theme_dark' : ''} ${props.className ? props.className : ''}`}>
            <div onClick={openOptions} className="dropdown__view">
                <span>{option ? option : props.defaultValue}</span>
            </div>
            <div className="dropdown__options">
                {props.options.map((item: string) =>
                    <p
                        onClick={() => {
                            setOption(item);
                            props.setOption(item);
                        }}
                        key={item}
                        className="dropdown__item">
                        {item}
                    </p>)}
            </div>
        </div>
    );
}
