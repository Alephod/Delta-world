import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUsersAction } from '../../actions/usersAction';
import { Loader } from '../../components/loader/Loader';
import { NewError } from '../../components/new-error/NewError';
import { UserCard } from '../../components/user-card/UserCard';
import './Users.scss';

interface Props {
    usersList: Array<any>;
    loading: boolean;
    usersTotal: number;
    isError: boolean;
    error: string;
    errorCode: string;
    load: (page: number, limit: number) => void;
    darkTheme: boolean;
}


function Users(props: Props) {
    const [page, setPage] = useState(1);
    const [isError, setIsError] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        props.load(page - 1, 6);
    }, [page]);
    useEffect(() => {
        document.title = 'Delta World — Пользователи';
        setIsError(false);
    }, []);

    return (
        <div className={`users container ${props.darkTheme ? 'users_theme_dark' : ''}`}>
            {props.loading ? <Loader /> :
                <div className="users__container">
                    {props.usersList.map((item: any) =>
                        <UserCard darkTheme={props.darkTheme} id={item.id} key={item.id} href={item.picture} title={item.title} firstName={item.firstName} lastName={item.lastName} />)}
                </div>
            }
            {props.usersTotal > 6 ?
                <div className="users__footer">
                    <Pagination className={`pagination ${props.darkTheme ? 'pagination_theme_dark' : ''}`} current={page} onChange={(page: number) => setPage(page)} pageSize={6} total={props.usersTotal} />
                </div>
                : null
            }
            <NewError
                darkTheme={props.darkTheme}
                active={isError}
                setIsError={setIsError}
                title={t('users.error.title')}
                errors={props.error}
                code={props.errorCode}
            />
        </div>
    );
}
export default connect(
    (state: any) => ({
        usersList: state.users.usersList,
        loading: state.users.loading,
        usersTotal: state.users.usersTotal,
        isError: state.users.isError,
        error: state.users.error,
        errorCode: state.users.errorCode,
    }),
    (dispatch) => ({
        load: bindActionCreators(loadUsersAction, dispatch),
    }),
)(Users);
