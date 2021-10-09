import Header from './components/Header'
import Footer from './components/Footer'
import Configuration from "./components/Configuration";
import BuildList from "./components/BuildList";
import Settings from "./components/Settings";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {useSelector} from "react-redux";

function App() {
    const settings = useSelector(state => state.settingsReducer = {
        github: state.settingsReducer.github,
        build: state.settingsReducer.build,
        branch: state.settingsReducer.branch,
        sync: state.settingsReducer.sync
    })

    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className="content">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={settings.github === '' ? Configuration : BuildList}>
                        </Route>
                        <Route path="/settings" component={Settings}>
                        </Route>

                    </Switch>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
