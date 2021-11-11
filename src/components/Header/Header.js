import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'
import './Header.css';
import HeaderDefault from "./HeaderDefault";
import HeaderSettings from "./HeaderSettings";
import useSettings from "../../hooks/useSettings";


function Header() {
    const [show, setShow] = useState(false);
    const settings = useSettings();

    return (
        <header>
            <Switch>
                <Route exact path="/">
                    {settings.github === '' ? <HeaderDefault/> :
                        <HeaderSettings github={settings.github} setShow={setShow} show={show}/>}
                </Route>
                <Route path="/settings">
                    <p>School CI server</p>
                </Route>
            </Switch>
        </header>
    )
}

export default React.memo(Header);