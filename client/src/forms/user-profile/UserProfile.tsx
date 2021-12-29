import React from 'react';
import UserInfo from '../../components/user-info/UserInfo';
import UserPosts from '../../components/user-posts/UserPosts';
import './UserProfile.scss';

interface Props {
    login: boolean;
    loading: boolean;
    userInfo: any;
    darkTheme: boolean;
    match: any;
    load: (id: string) => void;
}

export default class UserProfile extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: ''
        };
    }

    componentDidMount() {
        this.setState({ id: this.props.match.params.id});
    }
    render() {
        return (
            <div className={`user-profile container ${this.props.darkTheme ? 'user-profile_theme_dark' : ''}`}>
                <UserInfo darkTheme={this.props.darkTheme} userID={this.props.match.params.id} login={this.props.login} />
                <UserPosts darkTheme={this.props.darkTheme} userID={this.props.match.params.id} />
            </div>
        );
    }
}
