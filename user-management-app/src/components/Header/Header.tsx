import React, {useContext} from "react";
import {SessionContext} from "../../App";
import "./Header.scss";
import {Link} from "react-router-dom";
import SessionService from "../../services/SessionService";

const Header = () => {
    const [context, setContext] = useContext(SessionContext);
    const {user} = context;
    const firstName = user?.firstName || ''
    const isAuth = !!(user && user.firstName)
    const onLogout =  () => {
        SessionService.clearSession();
        setContext({});
    }
    return (
        <header className="header">
            <h2 className="header__title">User Management System</h2>
            <div className="header__navigation">
                {isAuth ? (
                    <>
                        <h4 className="user__title">Hello, <span className="user__title_name">{firstName}</span></h4>
                        {/*<Link to={"/"} className="header__navigation_link">Users</Link>*/}
                        {/*<Link to={"/groups"} className="header__navigation_link">Group</Link>*/}
                        <div className="header__navigation_link" onClick={onLogout}>Sign out</div>
                    </>
                ) : (
                    <Link to={"/login"} className="header__navigation_link">Sign in</Link>
                )}
            </div>
        </header>
    );
}

export default Header;
