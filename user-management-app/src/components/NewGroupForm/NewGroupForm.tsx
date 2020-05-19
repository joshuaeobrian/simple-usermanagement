import React, {useState} from "react";
import Input from "../Input/Input";
import ErrorText from "../ErrorText/ErrorText";
interface INewGroupForm {
    addGroup: (value: string) => void;
    validate: (value: string) => string;
}

/**
 * @description renders the form to allow a user to enter in a new group
 * @param addGroup
 * @param validate - allows to validate from parent
 */
const NewGroupForm: React.FC<INewGroupForm> = ({addGroup, validate}) => {
    const [groupName, setGroupName] = useState("");
    const [error, setError] = useState("");
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const error = validate(groupName);
        if (error) {
            setError(error);
        } else {
            addGroup(groupName);
            setGroupName("");
            setError("")
        }
    }
    return (
        <form className="group_management_new_form" onSubmit={onSubmit}>
            <Input handleChange={setGroupName} value={groupName} placeholder="Group Name"/>
            <button className="btn">Create</button>
            <ErrorText error={error}/>
        </form>
    );
}

export default NewGroupForm;
