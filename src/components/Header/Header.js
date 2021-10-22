import {useContext, useState} from 'react';
import Button from '../Button/Button.js'
import Settings from '../icons/Settings.js'
import Play from '../icons/12Play.js'
import {Link, Route, Switch} from 'react-router-dom'
import {Context} from "../GithubContext.js"
import Modal from '../Modal/Modal.js'
import './Header.css';


function Header() {
    const [show, setShow] = useState(false);
    const [context] = useContext(Context);

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
            <p className="githubRepo">{context.github}</p>
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
                    context.github === '' ?
                        headerDef : headerSet}/>
                <Route path="/settings">
                    <p>School CI server</p>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;