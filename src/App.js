import {useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Configuration from "./components/Configuration";
import BuildList from "./components/BuildList";
import Settings from "./components/Settings";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Context} from "./components/GithubContext.js"


function App() {

    const [context, setContext] = useState({
        github: '',
        build: '',
        branch: '',
        sync: '',
    });

    return (
        <BrowserRouter>
            <Context.Provider value={[context, setContext]}>
                <div className="wrapper">
                    <div className="content">
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={context.github === '' ? Configuration : BuildList}>
                            </Route>
                            <Route path="/settings" component={Settings}>
                            </Route>

                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Context.Provider>
        </BrowserRouter>
    );
}

export default App;
