import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getpostInfoAction } from '../../actions/postAction';
import { Helper } from '../../wrappers/helper/Helper';
import Comments from '../comments/Comments';
import { FormatDate } from '../format-date/formatDate';
import { Loader } from '../loader/Loader';
import './Post.scss';


interface Props {
    postID: string;
    postInfo: any;
    loading: boolean;
    isError: boolean;
    error: string;
    errorCode: any;
    darkTheme: boolean;
    setIsPostOpened: (state: boolean) => void;
    load: (id: string) => void;
}

function Post(props: Props) {

    useEffect(() => {
        props.load(props.postID);
    }, []);

    return (
        <div className={`post ${props.darkTheme ? 'post_theme_dark' : ''}`}>
            <div onClick={() => props.setIsPostOpened(false)} className="post__close-btn">
                <span></span>
                <span></span>
            </div>
            <div className="post__contanier">
                {props.loading ? <Loader /> :
                    <div className="post__inner">
                        <div className="post__header">
                            <Link to={`/user/${props.postInfo.owner?.id}`} className="post__author">
                                <img className="post__author-img" src={props.postInfo.owner?.picture} alt="" />
                                <Helper comment={props.postInfo.owner?.id} themeDark={props.darkTheme}>
                                    <p className="post__author-name">
                                        {`${props.postInfo.owner?.title ? props.postInfo.owner?.title + '.' : ''}
                                ${props.postInfo.owner?.firstName} ${props.postInfo.owner?.lastName}`}
                                    </p>
                                </Helper>
                            </Link>
                            <p className="post__date">
                                <FormatDate date={new Date(props.postInfo.publishDate)} formatTime />
                            </p>
                        </div>
                        <div className="post__body">
                            <div className="post__img">
                                <img src={props.postInfo.image} alt="" />
                            </div>
                            <p className="post__text">{props.postInfo.text}</p>
                        </div>
                        <div className="post__comments">
                            <Comments darkTheme={props.darkTheme} postID={props.postID} />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default connect(
    (state: any) => ({
        postInfo: state.postInfo.postInfo,
        loading: state.postInfo.loading,
        isError: state.postInfo.isError,
        error: state.postInfo.error,
        errorCode: state.postInfo.errorCode,
    }),
    (dispatch) => ({
        load: bindActionCreators(getpostInfoAction, dispatch),
    }),
)(Post);
