import './App.scss';
import { Header } from './forms/header/Header';
import LogIn from './forms/log-in/LogIn';
import Register from './forms/register/Register';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import UserProfile from './forms/user-profile/UserProfile';
import { UserContext, UserProvider } from './context/userContext';
import Users from './forms/users/Users';
import Posts from './forms/posts/Posts';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { Footer } from './forms/footer/Footer';


function App() {
    return (
        <UserProvider>
            <UserContext.Consumer>
                {(userContext) => (
                    <ThemeProvider>
                        <ThemeContext.Consumer>
                            {(themeContext) => (

                                <div className="body">
                                    <BrowserRouter>
                                        <Header darkTheme={themeContext.darkTheme} login={userContext.isLogin} />
                                        <main className="main">
                                            <Switch>
                                                <Route exact path="/login">
                                                    <LogIn darkTheme={themeContext.darkTheme} setLogin={userContext.setLogin} />
                                                </Route>
                                                <Route exact path="/reg">
                                                    <Register darkTheme={themeContext.darkTheme} setLogin={userContext.setLogin} />
                                                </Route>
                                                <Route
                                                    path="/user/:id"
                                                    render={props => {
                                                        const {
                                                            match: {
                                                                params: { id }
                                                            }
                                                        } = props;
                                                        return (
                                                            <UserProfile {...props} darkTheme={themeContext.darkTheme} key={`${id}`} login={userContext.isLogin} />
                                                        );
                                                    }}
                                                />
                                                <Route exact path="/users">
                                                    <Users darkTheme={themeContext.darkTheme} />
                                                </Route>
                                                <Route exact path="/posts">
                                                    <Posts darkTheme={themeContext.darkTheme} />
                                                </Route>
                                                <Redirect from="/" to="/posts" />
                                            </Switch>
                                        </main>
                                        <Footer darkTheme={themeContext.darkTheme} />
                                    </BrowserRouter>
                                </div>

                            )}
                        </ThemeContext.Consumer>
                    </ThemeProvider>
                )}
            </UserContext.Consumer>
        </UserProvider >
    );
}

export default App;
