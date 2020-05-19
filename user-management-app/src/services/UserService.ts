import {IUser} from "../reducers/useUsers";

const BASE_URL = "/api/v1/user";
class UserService {
    /**
     *
     * @param user
     */
    add(user: Partial<IUser>) {
        return fetch(BASE_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then(rs => rs.json()).catch(e => console.log("Failed to add user:  ", e));
    }

    /**
     *
     * @param id
     */
    deleteByID(id: number){
        return fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        }).then(rs => rs).catch(e => console.log("Could not delete user: ", e));
    }

    /**
     *
     */
    getAll() {
        return fetch(BASE_URL).then(rs => rs.json());
    }

    /**
     *
     */
    getAllUsersWithOutGroups() {
        return fetch(`${BASE_URL}/no-group`).then(rs=> rs.json())
    }
}

export default new UserService();
