import {useReducer, useEffect} from "react";
import UserService from "../services/UserService";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role: { id: number, roleName: "admin" | "employee" | "vendor"}
}
const initialState =  {
    users : [] as IUser[],
    selectedUserID: -1
}
/**
 * @description UserReducer maintains the application state for the user management page
 * @param state
 * @param action
 */
const userReducer = (state=initialState, action: {type: string, payload?: any}) => {
    switch (action.type) {
        case "INITIALIZE_USERS":
            return {
                ...state,
                users: action.payload
            }
        case "ADD_USER":
            return {...state, users: [...state.users, action.payload]};
        case "DELETE_USER":
            return {
                ...state,
                users: state.users.filter(user => user.id !== state.selectedUserID),
                selectedUserID: -1
            };
        case "SELECT_USER":
            return {
                ...state,
                selectedUserID: action.payload
            }
        default:
            return state;
    }
}
/**
 * Initializes the user reducer state and contains all the actions
 */
const useUsers = () => {
    const [state, dispatch] = useReducer(userReducer, initialState)
    useEffect(() => {
        UserService.getAll().then(users => dispatch({type: "INITIALIZE_USERS", payload: users}))
    }, []);
    const addUser = (user: IUser) => {
        UserService.add(user).then(user =>
            dispatch({type: "ADD_USER", payload: user})
        );
    }
    const deleteUser = () =>{
        UserService.deleteByID(state.selectedUserID).then(rs =>
            dispatch({type: "DELETE_USER"})
        );
    }
    const selectUser = (id: number) => {
        dispatch({type: "SELECT_USER", payload: id})
    }
    return {users: state.users as IUser[], selectedUserID: state.selectedUserID, addUser, deleteUser, selectUser}
}

export default useUsers;
