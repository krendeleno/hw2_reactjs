import React, {Suspense, lazy} from "react";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useSelector} from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Configuration = lazy(() => import('./pages/Configuration/Configuration'));
const BuildList = lazy(() => import('./pages/BuildList/BuildList'));
const Settings = lazy(() => import('./pages/Settings/Settings'));


function App() {

    const settings = useSelector(state => state.settingsReducer)

    const links = ["Support", "Learning", "Русская версия"]

    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className="content">
                    <Header/>
                    <Suspense fallback={ <Loader type="TailSpin" color="var(--action-color)" height={80} width={80} />}>
                        <Switch>
                            <Route exact path="/" render={settings.github === '' ?
                                () => (<Configuration title="School CI Server"
                                                      description="A simple app for sync with Github"/>) :
                                () => (<BuildList title="Build history"
                                                  description="Some builds in a list"/>)}/>
                            <Route path="/settings" render={() => <Settings title="Settings"
                                                                            description="Settings for Github sync"/>}/>

                        </Switch>
                    </Suspense>
                </div>
                <Footer links={links} copyright="krendeleno"/>
            </div>
        </BrowserRouter>
    );
}

export default App;
