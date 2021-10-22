import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Configuration from "./pages/Configuration/Configuration";
import BuildList from "./pages/BuildList/BuildList";
import Settings from "./pages/Settings/Settings";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useSelector} from "react-redux";

function App() {

    const settings = useSelector(state => state.settingsReducer = {
        github: state.settingsReducer.github,
        build: state.settingsReducer.build,
        branch: state.settingsReducer.branch,
        sync: state.settingsReducer.sync
    })

    const links = ["Support","Learning","Русская версия"]

    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className="content">
                    <Header/>
                    <Switch>
                        <Route exact path="/" render={settings.github === '' ?
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
        </BrowserRouter>
    );
}

export default App;
