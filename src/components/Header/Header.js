import {useState} from 'react';
import Button from '../Button/Button.js'
import Settings from '../icons/Settings.js'
import Play from '../icons/12Play.js'
import {Link, Route, Switch} from 'react-router-dom'
import Modal from '../Modal/Modal.js'
import './Header.css';
import {useSelector} from "react-redux";


function Header() {
    const [show, setShow] = useState(false);
    const settings = useSelector(state => state.settingsReducer = {
        github: state.settingsReducer.github,
        build: state.settingsReducer.build,
        branch: state.settingsReducer.branch,
        sync: state.settingsReducer.sync
    })


    // В зависимости от наличия настроек в контексте выводятся разные хэдеры
    const headerDef = props =>
        <>
            <p>School CI server</p>
            <Link to="/settings">
                <Button buttonType="default hasIcon">
                    <Settings style={{width: "12px"}}/>
                    <p>Settings</p>
                </Button>
            </Link>
        </>

    const headerSet = props =>
        <>
            <p className="githubRepo">{settings.github}</p>
            <div className="buildButtons hasIcon">
                <Button buttonType="default" action={() => setShow(true)}>
                    <Play style={{width: "12px"}}/>
                    <p>Run build</p>
                </Button>
                <Link to="/settings">
                    <Button buttonType="default icon">
                        <Settings style={{width: "12px"}}/>
                    </Button>
                </Link>
            </div>
            <Modal show={show} onClose={() => setShow(false)} onSubmit={() => setShow(false)}/>
        </>


    return (
        <header>
            <Switch>
                <Route exact path="/" component={
                    settings.github === '' ?
                        headerDef : headerSet}/>
                <Route path="/settings">
                    <p>School CI server</p>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;