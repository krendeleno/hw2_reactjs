import {useState, useEffect} from 'react';
import Button from './Button.js'
import Input from './Input.js'
import './css/Modal.css';
import {useDispatch, useSelector} from "react-redux";
import {add} from "../actions";


function Modal({show, onClose}) {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settingsReducer = {
        github: state.settingsReducer.github,
        build: state.settingsReducer.build,
        branch: state.settingsReducer.branch,
        sync: state.settingsReducer.sync
    })
    const [disabled, setDisabled] = useState(false);
    const [inputs, setInputs] = useState({hash: ''})


    // Следующие  2 функции нужны, чтобы модалка закрывалась на Esc
    const closeEsc = (event) => {
        if (event.charCode || event.keyCode === 27) {
            setTimeout(onClose, 0);
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


    // Не очень понятно, что же нужно было сделать при нажатии на Run Build,
    // но раз уж в редаксе это было легко, я сделала поставку билда в очередь
    const handleSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        dispatch(add({
            status: "success",
            branch: settings.branch || "my favourite branch",
            author: "me",
            hash: inputs.hash,
            message: "first commit",
            time: `0 ч 1 мин`,
            date: new Date(),
            number: 1000
        }))
        // Имитация асинхронности, которую мы заслужили...
        setTimeout(() => {
                setDisabled(false);
                setTimeout(onClose, 0)
            },
            500
        )
    }

    const doReset = (event) => {
        const name = event.target.name;
        setInputs(values => ({...values, [name]: ''}));
    }


    if (!show)
        return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modalContent" onClick={(event => event.stopPropagation())}>
                <h1>New build</h1>
                <p>Enter the commit hash which you want to build.</p>
                <form onSubmit={handleSubmit}>
                    <Input handleChange={handleChange} doReset={doReset} name="hash" value={inputs.hash}
                           placeholder="Commit hash" required={true} autofocus={input => input && input.focus()}/>
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

    )
}

export default Modal;