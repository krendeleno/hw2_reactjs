import {useContext, useEffect, useState} from 'react';
import Button from '../Button/Button.js'
import Input from '../Input/Input.js'
import {Context} from "../GithubContext.js"
import './Modal.css';
import {RandomBuild} from '../../randomBuildGenerator'
import {createPortal} from 'react-dom'
import FocusLock from 'react-focus-lock';

function Modal({show, onClose}) {
    const [inputs, setInputs] = useState({hash: ''})
    const [disabled, setDisabled] = useState(false);
    const [context, setContext] = useContext(Context);


    // Следующие  2 функции нужны, чтобы модалка закрывалась на Esc
    const closeEsc = (event) => {
        if (event.charCode || event.keyCode === 27) {
            onClose();
        }
    }

    useEffect(() => {
        document.body.addEventListener("keydown", closeEsc)
        return function cleanup() {
            document.body.removeEventListener("keydown", closeEsc)
        }
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);

        let newAddedBuilds = [new RandomBuild(context.branch, new Date(), inputs.hash), ...context.addedBuilds || []]
        setContext(values => ({...values, addedBuilds: newAddedBuilds}));
        setDisabled(false);
        onClose();
    }

    const doReset = (event) => {
        const name = event.target.name;
        setInputs(values => ({...values, [name]: ''}));
    }

    if (!show)
        return null;

    return createPortal(
        <FocusLock>
            <div className="modal" onClick={onClose}>
                <div className="modalContent" onClick={(event => event.stopPropagation())}>
                    <h1>New build</h1>
                    <p>Enter the commit hash which you want to build.</p>
                    <form onSubmit={handleSubmit}>
                        <Input handleChange={handleChange} doReset={doReset} name="hash" value={inputs.hash}
                               placeholder="12345myhash" required={true} autofocus={input => input && input.focus()}
                               pattern="[\w\d]+"/>
                        <div className="settingsButtons">
                            <Button buttonType="colored" disabled={disabled}>
                                <p>Run build</p>
                            </Button>
                            <Button buttonType="default" action={onClose} disabled={disabled}>
                                <p>Cancel</p>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </FocusLock>
        , document.body)
}

export default Modal;