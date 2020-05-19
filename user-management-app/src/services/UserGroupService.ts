import {IUser} from "../reducers/useUsers";

const BASE_URL = "/api/v1/user-group";

class UserGroupService {
    /**
     *
     */
    getAllGroups() {
        return fetch(BASE_URL).then(rs => rs.json());
    }

    /**
     *
     * @param groupName
     */
    addGroup(groupName: string) {
        return fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({groupName})
        }).then(rs => rs.json());
    }

    /**
     *
     * @param id
     */
    deleteGroup(id: number) {
        return fetch(`${BASE_URL}/${id}`, {method: "DELETE"});
    }

    /**
     *
     * @param groupId
     * @param user
     */
    addUserToGroup(groupId: number, user: IUser) {
        return fetch(`${BASE_URL}/${groupId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(rs => rs.json());
    }

    /**
     *
     * @param groupId
     * @param userId
     */
    deleteUserFromGroup(groupId: number, userId: number) {
        return fetch(`${BASE_URL}/${groupId}/${userId}`, {method: "DELETE"});
    }
}

export default new UserGroupService();
