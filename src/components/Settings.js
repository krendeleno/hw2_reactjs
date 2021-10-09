import {useContext, useState} from 'react';
import Button from './Button.js'
import Input from './Input.js'
import {Context} from "./GithubContext.js"
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask'
import './css/Settings.css';

var mask = function (rawValue) {
    return Array(rawValue.length).fill(/\d/);
}

function Settings() {
    const history = useHistory();
    const [context, setContext] = useContext(Context);
    const [inputs, setInputs] = useState(Context);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);
        setDisabled(true);
        // Имитация клонирования, поэтому задержка
        try {
            setTimeout(() => {
                setContext(inputs);
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

    const doReset = (event) => {
        const name = event.target.name;
        setInputs(values => ({...values, [name]: ''}));
    }
    // Для валидации форм я использую required, т.к. сейчас он поддерживается во всех браузерах и мне показалось,
    // что по смыслу задания этого достаточно, а для числовой формы react-text-mask
    return (
        <div className="forms">
            <p className="titleSettings">Settings</p>
            <p className="description">Configure repository connection and synchronisation settings.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="github" className="required">Github repository</label>
                <Input handleChange={handleChange} doReset={doReset} name="github" value={inputs.github}
                       placeholder="user-name/repo-name" required={true}/>

                <label htmlFor="build" className="required">Build command</label>
                <Input handleChange={handleChange} doReset={doReset} name="build" value={inputs.build}
                       placeholder="Build command" required={true}/>

                <label htmlFor="branch">Main branch</label>
                <Input handleChange={handleChange} doReset={doReset} name="branch" value={inputs.branch}
                       placeholder="Branch name" required={false}/>


                <label htmlFor="sync">Synchronize every
                    <MaskedInput
                        mask={mask}
                        id="sync"
                        type="search"
                        name="sync"
                        value={inputs.sync || ""}
                        onChange={handleChange}
                        guide={false}
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