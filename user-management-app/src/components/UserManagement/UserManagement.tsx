import React, {useContext, useState} from "react";
import useUsers, {IUser} from "../../reducers/useUsers";
import NewUserForm from "../NewUserForm/NewUserForm";
import Table, {TBody, TCell, THeader, TRow} from "../Table/Table";
import {ConfirmationModal} from "../Modal/Modal";
import UserManagementNav from "../UserManagementNav/UserManagementNav";
import "./UserManagement.scss"
import {SessionContext} from "../../App";

/**
 * @description renders the User Management Page
 */
const UserManagement = () => {
    const [context] = useContext(SessionContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const {users, addUser, deleteUser, selectUser} = useUsers();
    /**
     * @description handles validation of new user against current users
     * Currently we are only checking to see if the email is unique
     * @param user
     */
    const validateNewUser = (user: IUser) => {
        const isUnique = users.every(u => u.email !== user.email)
        return isUnique ? "" : "Email is already used.";
    }
    /**
     * @description handles the deletion of selected user
     * selects the user than opens confirmation modal
     * @param id
     */
    const handleDelete = (id: number) => () => {
        selectUser(id);
        setShowDeleteModal(true)
    }
    return (
        <>
            <div className="user_management">
                <UserManagementNav/>
                <div className="user_management_content">
                    <NewUserForm addUser={addUser} validate={validateNewUser}/>
                    <div className="user_management_users">
                        <h3 className="user_management_users_title">Users:</h3>
                        <Table>
                            <THeader>
                                <TCell>ID</TCell>
                                <TCell>First Name</TCell>
                                <TCell>Last Name</TCell>
                                <TCell>Email</TCell>
                                <TCell/>
                            </THeader>
                            <TBody>
                                {users.map((user: IUser) => {
                                    return (
                                        <TRow key={user.id}>
                                            <TCell>{user.id}</TCell>
                                            <TCell>{user.firstName}</TCell>
                                            <TCell>{user.lastName}</TCell>
                                            <TCell>{user.email}</TCell>
                                            <TCell>
                                                <button className="btn btn-transparent delete"
                                                        disabled={user?.role?.roleName === "admin" || user?.id === context.user?.id}
                                                        onClick={handleDelete(user.id)}>
                                                    <i className="fa fa-trash" />
                                                </button>
                                            </TCell>
                                        </TRow>
                                    );
                                })}
                            </TBody>
                        </Table>
                    </div>
                </div>
            </div>
            <ConfirmationModal show={showDeleteModal}
                               hide={() => setShowDeleteModal(false)}
                               onConfirmation={deleteUser}/>
        </>
    );
}

export default UserManagement;
