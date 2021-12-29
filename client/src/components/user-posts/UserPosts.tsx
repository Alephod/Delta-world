import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userPostsAction } from '../../actions/userPostsAction';
import { Loader } from '../loader/Loader';
import { PostCard } from '../post-card/PostCard';
import Post from '../post/Post';
import './UserPosts.scss';

interface Props {
    loading: boolean;
    posts: Array<any>
    userID: string;
    total: number;
    darkTheme: boolean;
    load: (id: string, page: number, limit: number) => void;
}



function UserPosts(props: Props) {
    const [page, setPage] = useState(1);
    const [isPostOpened, setIsPostOpened] = useState(false);
    const [postID, setPostID] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        props.load(props.userID, page - 1, 6);
    }, [page]);
    const openPost: any = (id: string, state: boolean) => {
        setIsPostOpened(state);
        setPostID(id);
    };
    useEffect(() => {
        isPostOpened ? document.body.style.overflowY = 'hidden' : document.body.style.overflowY = 'scroll';
    }, [isPostOpened]);

    return (
        <div className={`user-posts ${props.total === 0 ? 'user-posts_no-post' : ''} ${props.darkTheme ? 'user-posts_theme_dark' : ''}`}>
            {!props.loading && props.posts.length === 0 ?
                <h2 className="user-posts__no-posts">{t('user-posts.no-posts')}</h2> :
                props.loading ? <Loader /> :
                    <div className="user-posts__container">
                        {props.posts.map((item: any) => <PostCard darkTheme={props.darkTheme} openPost={openPost} type="profile" id={item.id} href={item.image} text={item.text} key={item.id} />)}
                    </div>
            }
            {props.total > 6 ?
                <div className="user-posts__footer">
                    <Pagination className={`pagination ${props.darkTheme ? 'pagination_theme_dark' : ''}`} current={page} onChange={(page: number) => setPage(page)} pageSize={6} total={props.total} />
                </div>
                : null
            }
            {isPostOpened ? <Post darkTheme={props.darkTheme} setIsPostOpened={setIsPostOpened} postID={postID} /> : null}
        </div>
    );
}
export default connect(
    (state: any) => ({
        posts: state.userPosts.posts,
        loading: state.userPosts.loading,
        total: state.userPosts.total,
        isError: state.userPosts.isError,
        error: state.userPosts.error,
        errorCode: state.userPosts.errorCode,
    }),
    (dispatch) => ({
        load: bindActionCreators(userPostsAction, dispatch),
    }),
)(UserPosts);
