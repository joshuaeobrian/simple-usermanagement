import React, {useEffect, createContext, useState} from 'react';
import {Route, useHistory} from "react-router-dom"
import './App.scss';
import LoginForm from "./components/LoginForm/LoginForm";
import Header from "./components/Header/Header";
import UserManagement from "./components/UserManagement/UserManagement";
import GroupManagement from "./components/GroupManagement/GroupManagement";
import { IUser } from './reducers/useUsers';
import SessionService from "./services/SessionService";

export interface ISession {
    user?: IUser
}

export const SessionContext = createContext<[ISession, (args?: any) => ISession]>([{}, (args: any) => ({})])

function App() {
    const [state, setState] = useState<ISession>({} as ISession)
    const history = useHistory();
    useEffect(() => {
        if (!state?.user) {
            const session = SessionService.check()
            if(session && session?.user) return setState(session);
            history.push("/login")
        } else {
            history.push("/")
        }
    }, [state, history]);
    return (

        <SessionContext.Provider value={[state, setState as (args: any) => ISession]}>
            <div className="App">
                <Header/>
                <div className="app_content">
                    <Route exact={true} path={"/"}>
                        {state.user?.id? (<UserManagement/>) : null}
                    </Route>
                    <Route path={"/groups"}>
                        <GroupManagement/>
                    </Route>
                    <Route path={"/login"}>
                        <LoginForm/>
                    </Route>

                </div>
            </div>
        </SessionContext.Provider>
    );
}

export default App;
