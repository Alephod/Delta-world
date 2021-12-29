import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { commentsAction } from '../../actions/commentsAction';
import { CommentCard } from '../comment-card/CommentCard';
import { FormatDate } from '../format-date/formatDate';
import { Loader } from '../loader/Loader';
import './Comments.scss';


interface Props {
    postID: string;
    loading: boolean;
    comments: Array<any>;
    total: number;
    isError: boolean;
    error: string;
    errorCode: string;
    darkTheme: boolean;
    load: (id: string, page: number, limit: number) => void;
}

function Comments(props: Props) {
    const [page, setPage] = useState(1);
    const { t } = useTranslation();

    useEffect(() => {
        props.load(props.postID, page - 1, 6);
    }, [page]);
    return (
        <div className={`comments ${props.darkTheme ? 'comments_theme_dark' : ''}`}>
            <div className="comments__container">
                {props.loading ? <Loader /> :
                    <div className={`comments__main ${props.comments.length === 0 ? 'comments__main_no-comments' : ''}`}>
                        {props.comments.length === 0 && page === 1 ? <h2 className="comments__no-comments">{t('comments.no-comments')}</h2> :
                            props.comments.map(item => <CommentCard
                                darkTheme={props.darkTheme}
                                key={item.owner.id}
                                href={item.owner?.picture}
                                text={item.message}
                                name={`${item.owner?.title ? item.owner?.title + '.' : ''} ${item.owner?.firstName} ${item.owner?.lastName}`}
                                date={<FormatDate date={new Date(item.publishDate)} formatTime/>}
                                userID={item.owner.id}
                            />)
                        }
                    </div>
                }
                {props.comments.length > 6 ?
                    <div className="comments__footer">
                        <Pagination className={`pagination ${props.darkTheme ? 'pagination_theme_dark' : ''}`} current={page} onChange={(page: number) => setPage(page)} pageSize={6} total={props.comments.length} />
                    </div> : null
                }
            </div>
        </div>
    );
}
export default connect(
    (state: any) => ({
        loading: state.comments.loading,
        comments: state.comments.comments,
        total: state.comments.total,
        isError: state.comments.isError,
        error: state.comments.error,
        errorCode: state.comments.errorCode,
    }),
    (dispatch) => ({
        load: bindActionCreators(commentsAction, dispatch),
    }),
)(Comments);
