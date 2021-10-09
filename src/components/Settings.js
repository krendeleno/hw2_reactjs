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
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        setError(false);
        event.preventDefault();
        setDisabled(true);
        // Имитация клонирования, поэтому задержка
        try {
            setTimeout(() => {
                setDisabled(false);
                history.push('/')
            }, 1000);
        } catch (e) {
            setDisabled(false);
            setError(true);
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
    // Для валидации форм я использую required, т.к. сейчас он поддерживается во всех браузерах и мне показалось,
    // что по смыслу задания этого достаточно, а для числовой формы react-text-mask
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

                {error ?
                    <p className="errorMessage"> Клонирование репозитория закончилось ошибкой, попробуйте еще раз! </p>
                :
                    <></>}

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