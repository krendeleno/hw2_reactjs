import {useCallback, useState} from 'react';
import Button from '../../components/Button/Button.js'
import {useHistory} from 'react-router-dom';
import MaskedInput from 'react-text-mask'
import './Settings.css';
import Input from '../../components/Input/Input.js'
import {set, clearAll} from '../../actions'
import {useDispatch} from "react-redux";
import {Helmet} from "react-helmet";
import useSettings from "../../hooks/useSettings";

let mask = function (rawValue) {
    return Array(rawValue.length).fill(/\d/);
}

function Settings({title, description}) {
    const settings = useSettings();
    const history = useHistory();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState(settings);
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

        if (settings.branch !== inputs.branch || settings.github !== inputs.github)
            // Я отчищаю список билдов, чтобы при вводе новых настроек они генерировались заново,
            // если новый репозиторий или ветка
            dispatch(clearAll())
        dispatch(set(inputs));

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
        history.push('/');
    }

    const doReset = useCallback((event) => {
        const name = event.target.name;
        setInputs(values => ({...values, [name]: ''}));
    }, []);

    // Для валидации форм я использую required, т.к. сейчас он поддерживается во всех браузерах и мне показалось,
    // что по смыслу задания этого достаточно, а для числовой формы react-text-mask
    return (
        <div className="forms">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </Helmet>
            <p className="titleSettings">Settings</p>
            <p className="description">Configure repository connection and synchronisation settings.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="github" className="required">Github repository</label>
                <Input handleChange={handleChange} doReset={doReset} name="github" value={inputs.github}
                       placeholder="user-name/repo-name" required={true} pattern="[A-Za-z0-9-_]+\/[A-Za-z0-9-_]+"/>

                <label htmlFor="build" className="required">Build command</label>
                <Input handleChange={handleChange} doReset={doReset} name="build" value={inputs.build}
                       placeholder="npm run start" required={true}/>

                <label htmlFor="branch">Main branch</label>
                <Input handleChange={handleChange} doReset={doReset} name="branch" value={inputs.branch}
                       placeholder="master" required={false}/>

                <label htmlFor="sync">Synchronize every
                    <MaskedInput
                        mask={mask}
                        id="sync"
                        type="text"
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