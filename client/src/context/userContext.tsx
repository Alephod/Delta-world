import React, { ReactNode, useState } from 'react';

interface Props {
    children: ReactNode;
}
interface UserState {
    isLogin: boolean;
    isUpdated: boolean;
    toggleTheme: () => void;
}
export const UserContext: any = React.createContext<Partial<UserState>>({});

export function UserProvider(props: Props) {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).auth : false);
    const id: string = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).id : '';
    const [isUpdated, setIsUpdated] = useState(false);

    const userUpdated: any = () => {
        setIsUpdated(true);
    };
    const userUpdatedFalse: any = () => {
        setIsUpdated(false);
    };
    return (
        <UserContext.Provider value={{
            setLogin: setIsLogin,
            userUpdated: userUpdated,
            userUpdatedFalse: userUpdatedFalse,
            isLogin: isLogin,
            isUpdated: isUpdated,
            id: id
        }
        }>
            {props.children}
        </UserContext.Provider>
    );
}
