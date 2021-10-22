import {useState} from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Configuration from "./pages/Configuration/Configuration";
import BuildList from "./pages/BuildList/BuildList";
import Settings from "./pages/Settings/Settings";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Context} from "./components/GithubContext.js"


function App() {
    const [context, setContext] = useState({
        github: '',
        build: '',
        branch: '',
        sync: '',
        addedBuilds: ''
    });

    const links = ["Support","Learning","Русская версия"]

    return (
        <BrowserRouter>
            <Context.Provider value={[context, setContext]}>
                <div className="wrapper">
                    <div className="content">
                        <Header/>
                        <Switch>
                            <Route exact path="/" render={context.github === '' ?
                                () => (<Configuration title="School CI Server"
                                                      description="A simple app for sync with Github"/>) :
                                () => (<BuildList title="Build history"
                                                  description="Some builds in a list"/>)} />
                            <Route path="/settings" render={() => <Settings title="Settings"
                                                                            description="Settings for Github sync"/>} />

                        </Switch>
                    </div>
                    <Footer links = {links} copyright="krendeleno"/>
                </div>
            </Context.Provider>
        </BrowserRouter>
    );
}

export default App;
