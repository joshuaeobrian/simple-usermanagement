import React from "react";
import "./Group.scss";
import {IUser} from "../../reducers/useUsers";

interface IGroup {
    group: { [key: string]: any }
    deleteGroup: () => void;
    addUserToGroup: (id: number) => () => void;
    deleteUserFromGroup: (id: number) => (user: IUser) => void;
}

function GroupUsers(props: { users: IUser[], deleteUserFromGroup: (user: IUser) => void}) {
    return (
        <div className="group_members">
            {!props.users?.length && (
                <div className="group_members_empty">No Assigned Users</div>
            )}
            {props.users?.map((user: any) => {
                return (
                    <div className="group_member" key={`user-${user.id}`}>
                        <div className="group_member_name">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="group_member_delete" onClick={() => props.deleteUserFromGroup(user)}>
                            <i className="fa fa-times"/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/**
 *
 * @param group
 * @param deleteGroup
 * @param addUserToGroup
 * @param deleteUserFromGroup
 */
const Group: React.FC<IGroup> = ({group, deleteGroup, addUserToGroup, deleteUserFromGroup}) => {
    return (
        <div className="group" key={group.id}>
            <h3 className="group_title">
                <div>{group.groupName}</div>
                <div className="btn-group">
                    <button className="btn btn-transparent" onClick={addUserToGroup(group.id)}>
                        <i className="fa fa-plus"/>
                    </button>
                    <button className="btn btn-transparent delete" onClick={deleteGroup}>
                        <i className="fa fa-trash"/>
                    </button>
                </div>
            </h3>
            <GroupUsers users={group.users}
                        deleteUserFromGroup={deleteUserFromGroup(group.id)}/>
        </div>
    );
}

export default Group;
