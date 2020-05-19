import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {SessionContext} from "../../App";

/**
 * @description Renders a Navigation menu if the user is Admin
 */
const UserManagementNav = () => {
    const [context] = useContext(SessionContext);
    const hide = context?.user?.role?.roleName !== "admin";
    return (
        <div className="user_management_nav" style={{visibility: hide ? "hidden" : "visible"}}>
            <Link to={"/"} className="user_management_nav_link">
                User Management
            </Link>
            <Link to={"/groups"} className="user_management_nav_link">
                Group Management
            </Link>
        </div>
    );
}

export default UserManagementNav;
