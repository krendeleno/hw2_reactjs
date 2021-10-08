import {useContext, useState} from 'react';
import Button from './Button.js'
import {Context} from "./GithubContext.js"
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask'
import './css/Settings.css';

var mask = function (rawValue) {
    return Array(rawValue.length).fill(/\d/);
}

function Settings() {
    const history = useHistory();
    const [inputs, setInputs] = useContext(Context);
    const [disabled, setDisabled] = useState(false);
    // const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        // Имитация клонирования, поэтому задержка
        try {
            setTimeout(() => {
                setDisabled(false);
                history.push('/')
            }, 1000);
        } catch (e) {
        }
    }

    const doCancel = () => {
        setInputs({
            github: '',
            build: '',
            branch: '',
            sync: '',
        })
        history.push('/');
    }
    return (
        <div className="forms">
            <p className="titleSettings">Settings</p>
            <p className="description">Configure repository connection and synchronisation settings.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="github" className="required">Github repository</label>
                <input
                    id="github"
                    type="search"
                    name="github"
                    value={inputs.github || ""}
                    onChange={handleChange}

                    required
                />
                <label htmlFor="build" className="required">Build command</label>
                <input
                    id="build"
                    type="search"
                    name="build"
                    value={inputs.build || ""}
                    onChange={handleChange}

                    required
                />

                <label htmlFor="branch">Main branch</label>
                <input
                    id="branch"
                    type="search"
                    name="branch"
                    value={inputs.branch || ""}
                    onChange={handleChange}

                />

                <label htmlFor="sync">Synchronize every
                    <MaskedInput
                        mask={mask}
                        id="sync"
                        type="search"
                        name="sync"
                        value={inputs.sync || ""}
                        onChange={handleChange}
                    />
                    <span>
                            minutes
                            </span>
                </label>

                <div className="settingsButtons">
                    <Button buttonType="colored" disabled={disabled}>
                        <p>Save</p>
                    </Button>
                    <Button buttonType="default" action={doCancel} disabled={disabled}>
                        <p>Cancel</p>
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Settings;