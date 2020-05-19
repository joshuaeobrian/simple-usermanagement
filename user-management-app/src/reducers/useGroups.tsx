import {useReducer, useEffect} from "react";
import {IUser} from "./useUsers";
import UserGroupService from "../services/UserGroupService";
import UserService from "../services/UserService";

interface IUserGroup {
    id: number;
    groupName: string;
    users: IUser[];
}

const initialGroupsState = {
    selectedGroupId: -1,
    groups: [] as IUserGroup[],
    availableUsers: [] as IUser[]
};
/**
 * Group Reducers controls the state of GroupManagement
 * @param state
 * @param action
 */
const groupReducer = (state = initialGroupsState, action: { type: string, payload?: any, filterID?: number}) => {
    switch (action.type) {
        case "INITIALIZE_GROUPS":
            return {
                ...state,
                groups: action.payload
            };
        case "ADD_AVAILABLE_USERS":
            return {
                ...state,
                availableUsers: action.payload
            }
        case "ADD_GROUP":
            return {
                ...state,
                groups: [...state.groups, action.payload]
            };
        case "DELETE_GROUP":
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload),
                selectedGroupId: -1
            };
        case "SELECT_GROUP":
            return {...state, selectedGroupId: action.payload};
        case "ADD_USER":
            return {
                ...state,
                groups: state.groups.map(group => {
                    if (group.id === action.payload.id) {
                        return action.payload
                    }
                    return group;
                }),
                availableUsers:  state.availableUsers.filter((u) => u.id !== action.filterID)
            };
        case "REMOVE_USER":
            return {
                ...state,
                groups: state.groups.map(group => {
                    if (group.id === action.payload.groupID) {
                        group.users = group.users.filter(u => u.id !== action.payload.user?.id)
                    }
                    return group;
                }),
                availableUsers: [...state.availableUsers, action.payload.user]
            };
        default:
            return state;
    }
}
/**
 * @description initializes the reducer state and maintains all the actions and calls to the api
 */
const useGroups = () => {
    const [state, dispatch] = useReducer(groupReducer, initialGroupsState);

    useEffect(() => {
        initializeGroups();
        setUsersWithOutGroups();
    }, [])
    const initializeGroups = () => {
        UserGroupService.getAllGroups().then(groups => dispatch({type: "INITIALIZE_GROUPS", payload: groups}))
    }
    const setUsersWithOutGroups = () => {
        UserService.getAllUsersWithOutGroups().then(users => dispatch({type: "ADD_AVAILABLE_USERS", payload: users}))
    }
    const addGroup = (groupName: string) => {
        UserGroupService.addGroup(groupName).then(group => {
            dispatch({type: "ADD_GROUP", payload: group})
        })
    }
    const deleteGroup = (id: number) => {
        UserGroupService.deleteGroup(id).then(() => {
            dispatch({type: "DELETE_GROUP", payload: id})
        })
    }
    const addUser = (userID: number) => {
        const user: IUser = state.availableUsers.find((u:IUser) => u.id === userID)
        UserGroupService.addUserToGroup(state.selectedGroupId, user).then( rs => {
            dispatch({type: "ADD_USER", payload: rs, filterID: userID})
        })
    }
    const deleteUser = (groupID: number, user: IUser) => {
        UserGroupService.deleteUserFromGroup(groupID, user.id).then(() => {
            dispatch({type: "REMOVE_USER", payload: {groupID, user}})
        });
    }
    const selectGroup = (id: number) => {
        dispatch({type: "SELECT_GROUP", payload: id})
    }
    return {
        groups: state.groups as any[],
        availableUsers: state.availableUsers,
        addGroup,
        deleteGroup,
        addUser,
        deleteUser,
        selectGroup
    }
}

export default useGroups;
