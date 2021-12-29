import React, { ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
}
interface ThemeState {
    darkTheme: boolean;
    toggleTheme: () => void;
}
const darkThemeLocal: boolean = localStorage.getItem('darkTheme') ? JSON.parse(localStorage.getItem('darkTheme') as string) : true;
export const ThemeContext: any = React.createContext<Partial<ThemeState>>({});

export function ThemeProvider(props: Props) {
    const [darkTheme, setDarkTheme] = useState(darkThemeLocal);
    const toggleTheme: Function = () => {
        setDarkTheme(!darkTheme);
        localStorage.setItem('darkTheme', JSON.stringify(!darkTheme));
    };
    return (
        <ThemeContext.Provider value={{
            darkTheme: darkTheme,
            toggleTheme: toggleTheme,
        }}>
            {props.children}
        </ThemeContext.Provider>
    );
}
