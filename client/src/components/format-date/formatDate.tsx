import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    date: Date;
    formatTime?: boolean;
    formatYear?: boolean;
}

export function FormatDate({ date, formatTime, formatYear }: Props) {
    const { t } = useTranslation();
    const [dateString, setStringDate] = useState('');

    useEffect(() => {
        let mouth: string = t(`mouths.${date.getMonth()}`);
        let time: string = `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;

        setStringDate(`${date.getDate()} ${mouth} ${formatYear ? date.getFullYear() : ''} ${formatTime ? time : ''}`);
    }, [date]);
    return (
        <span>
            {dateString}
        </span>
    );
}
