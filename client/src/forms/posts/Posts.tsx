import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postsAction } from '../../actions/postsAction';
import { Loader } from '../../components/loader/Loader';
import { NewError } from '../../components/new-error/NewError';
import { PostCard } from '../../components/post-card/PostCard';
import Post from '../../components/post/Post';
import './Posts.scss';

interface Props {
    posts: Array<any>;
    loading: boolean;
    total: number;
    isError: boolean;
    error: string;
    errorCode: string;
    darkTheme: boolean;
    load: (page: number, limit: number) => void;
}

function Posts(props: Props) {
    const [page, setPage] = useState(1);
    const [isError, setIsError] = useState(false);
    const [isPostOpened, setIsPostOpened] = useState(false);
    const [postID, setPostID] = useState('');
    const [isRedirected, setIsRedirected] = useState(false);
    const { t } = useTranslation();

    const openPost: any = (id: string, state: boolean) => {
        setIsPostOpened(state);
        setPostID(id);
    };

    useEffect(() => {
        props.load(page - 1, 6);
    }, [page]);
    useEffect(() => {
        setIsRedirected(false);
        document.title = 'Delta World — Посты';
        setIsError(false);
    }, []);
    useEffect(() => {
        isPostOpened ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'auto';
    }, [isPostOpened]);

    return (
        <div className={`posts container ${props.darkTheme ? 'posts_theme_dark' : ''}`}>
            {props.loading ? <Loader /> :
                <div className="posts__container">
                    {props.posts.map((item: any) => <PostCard darkTheme={props.darkTheme} owner={item.owner} publishDate={item.publishDate} openPost={openPost} type="posts" id={item.id} href={item.image} text={item.text} key={item.id} />)}
                </div>
            }
            {props.total > 6 ?
                <div className="posts__footer">
                    <Pagination className={`pagination ${props.darkTheme ? 'pagination_theme_dark' : ''}`} current={page} onChange={(page: number) => setPage(page)} pageSize={6} total={props.total} />
                </div>
                : null
            }
            {isPostOpened ? <Post darkTheme={props.darkTheme} setIsPostOpened={setIsPostOpened} postID={postID} /> : null}
            <NewError
                darkTheme={props.darkTheme}
                active={isError}
                setIsError={setIsError}
                title={t('posts.error.title')}
                errors={props.error}
                code={props.errorCode}
            />
        </div>
    );
}
export default connect(
    (state: any) => ({
        posts: state.posts.posts,
        loading: state.posts.loading,
        total: state.posts.total,
        isError: state.posts.isError,
        error: state.posts.error,
        errorCode: state.posts.errorCode,
    }),
    (dispatch) => ({
        load: bindActionCreators(postsAction, dispatch),
    }),
)(Posts);
