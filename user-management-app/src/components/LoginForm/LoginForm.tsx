import React, {useState, useContext} from "react";
import SessionService from "../../services/SessionService";
import {SessionContext} from "../../App";
import "./LoginForm.scss"
import Input from "../Input/Input";

/**
 * @description Generates User login form
 */
const LoginForm = () => {
    const [, updateContext] = useContext(SessionContext);
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        SessionService.create(username, password)
            .then(rs => updateContext(rs))
            .catch(e => {
                setError(true)
            });
    }

    return (
        <div className="login_form">
            <h3 className="login_form_title">Login</h3>
            <form className="login_form_content" onSubmit={onSubmit}>
                <Input type="text"
                       placeholder="Enter username"
                       handleChange={setUsername}/>
                <Input type="password"
                       placeholder="Enter password"
                       handleChange={setPassword}/>
                <p className="login_form_error" style={{visibility: !error ? "hidden" : "visible"}}>
                    * username or password is incorrect
                </p>
                <button className="btn btn-submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm
