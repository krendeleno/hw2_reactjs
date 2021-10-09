import {useState} from 'react';
import Button from './Button.js'
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask'
import './css/Settings.css';
import {set, clearAll} from '../actions'
import {useDispatch} from "react-redux";

var mask = function (rawValue) {
    return Array(rawValue.length).fill(/\d/);
}

function Settings() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState(false);
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

        dispatch(set(inputs));
        // Я отчищаю список билдов, чтобы при вводе новых настроек они генерировались заново
        dispatch(clearAll())

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
                    placeholder="user-name/repo-name"
                    required
                />
                <label htmlFor="build" className="required">Build command</label>
                <input
                    id="build"
                    type="search"
                    name="build"
                    value={inputs.build || ""}
                    onChange={handleChange}
                    placeholder="Build command"
                    required
                />

                <label htmlFor="branch">Main branch</label>
                <input
                    id="branch"
                    type="search"
                    name="branch"
                    value={inputs.branch || ""}
                    onChange={handleChange}
                    placeholder="Branch name"

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