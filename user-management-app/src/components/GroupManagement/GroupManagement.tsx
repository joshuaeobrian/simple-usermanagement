import React, {useState} from "react";
import UserManagementNav from "../UserManagementNav/UserManagementNav";
import Group from "../Group/Group";
import useGroups from "../../reducers/useGroups";
import "./GroupManagement.scss";
import NewGroupForm from "../NewGroupForm/NewGroupForm";
import Modal from "../Modal/Modal";
import {IUser} from "../../reducers/useUsers";

/**
 *
 * @constructor
 */
const GroupManagement = () => {
    const {groups, addGroup, availableUsers, addUser, selectGroup, deleteGroup, deleteUser} = useGroups()
    const [showModal, setShowModal] = useState(false);
    const [userID, setUserID] = useState(-1)
    const validateNewGroupName = (value: string) => {
        return groups.every(group => group.groupName !== value)? "" : "Group name already used..."
    }
    const deleteGroupByID = (id: number) => () => deleteGroup(id);
    const deleteUserFromGroup = (groupID: number) => (user: IUser) => {
        deleteUser(groupID, user);
    }
    const addGroupUserClick = (id: number) => () => {
        selectGroup(id);
        show();
    }
    const addUserClick = () => {
        addUser(userID);
        setUserID(-1)
        hide();
    }
    const show = () => {
        setShowModal(true);
    }
    const hide = () => setShowModal(false);
    return (
        <>
            <div className="group_management">
                <UserManagementNav/>
                <div className="group_management_content">
                    <NewGroupForm addGroup={addGroup} validate={validateNewGroupName}/>
                    <div className="group_management_assignment">
                        {groups.map((group: any) => {
                            return <Group key={group.id + "group"}
                                          group={group}
                                          deleteGroup={deleteGroupByID(group.id)}
                                          addUserToGroup={addGroupUserClick}
                                          deleteUserFromGroup={deleteUserFromGroup}/>
                        })}
                    </div>
                </div>
            </div>
            <Modal show={showModal} hide={hide}>
                <div className="add_user_selection">
                    <h3 className="add_user_selection_title">Users:</h3>
                    <select onChange={(e) => setUserID(Number(e.target.value))}>
                        <option>Choose User</option>
                        {availableUsers.map( (user: IUser) =>
                            <option key={user.id+ "user-options"} value={user.id}>{user.firstName} {user.lastName}</option>
                        )}
                    </select>
                    <button className="btn" onClick={addUserClick} disabled={userID === -1}>
                        Add User
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default GroupManagement;
