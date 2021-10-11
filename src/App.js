import {useEffect, useState} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Configuration from "./components/Configuration";
import BuildList from "./components/BuildList";
import Settings from "./components/Settings";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Context} from "./components/GithubContext.js"


function App() {
    // Автоматический апдейт мета-тегов тайтл и описание, знаю, надо было поставить helmet, но времени было мало
    const [title, setTitle] = useState("School CI Server");
    const [description, setDescription] = useState("A simple app for sync with Github");


    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        document.getElementsByTagName("META")[3].content = description;
    }, [description])

    const changeMeta = (title, description) => {
        setTitle(title);
        setDescription(description);
    };

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
                                () => (<Configuration changeMeta={changeMeta} title="School CI Server"
                                                      description="A simple app for sync with Github"/>) :
                                () => (<BuildList changeMeta={changeMeta} title="Build history"
                                                  description="Some builds in a list"/>)} />
                            <Route path="/settings" render={() => <Settings changeMeta={changeMeta} title="Settings"
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
