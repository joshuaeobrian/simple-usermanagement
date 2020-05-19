import {IUser} from "../../reducers/useUsers";
import React, {useState} from "react";
import Input from "../Input/Input";
import "./NewUserForm.scss";
import ErrorText from "../ErrorText/ErrorText";

interface INewUserForm {
    addUser: (user: IUser) => void;
    validate: (user: IUser) => string | undefined;
}

/**
 * @description renders a form that allows new entries of users
 * @param addUser - functions adds the user
 * @param {(user: IUser) => string }validate - callback function that allows validation on parent
 */
const NewUserForm = ({addUser,validate}: INewUserForm) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    /**
     * @description handles Form Validation and submission of a new user
     * then clears the form if there is not an error
     * @param e
     */
    const validateFormAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {firstName, lastName, email, password} as IUser;
        const error = validate(user);
        if(error) {
            setError(error);
        }else{
            addUser(user);
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setError("")
        }
    }
    /**
     * @description checks to see if fields are fills with numbers or letters to enable
     * save button
     * @return {boolean}
     */
    const enableSave = () => {
        const reg = /[a-zA-Z0-9]/g;
        return reg.test(firstName) && reg.test(lastName) && reg.test(email) && reg.test(password);
    }
    return (
        <div className="user_management_new_user">
            <h3 className="user_management_new_user_title">New User:</h3>
            <form className="user_management_new_user_form" onSubmit={validateFormAndSubmit}>
                <Input type="text" placeholder="First Name" value={firstName} handleChange={setFirstName}/>
                <Input type="text" placeholder="Last Name" value={lastName} handleChange={setLastName}/>
                <Input type="text" placeholder="Email" value={email} handleChange={setEmail}/>
                <Input type="password" placeholder="Password" value={password} handleChange={setPassword}/>
                <button className="btn" disabled={!enableSave()}>Save</button>
                <ErrorText error={error}/>
            </form>
        </div>
    );
}

export default NewUserForm;
