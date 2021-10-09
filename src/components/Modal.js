import {useState} from 'react';
import Button from './Button.js'
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

    const [inputs, setInputs] = useState({hash: ''})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }


    // Не очень понятно, что же нужно было сделать при нажатии на Run Build,
    // но раз уж в редаксе это было легко, я сделала поставку билда в очередь
    const handleSubmit = (event) => {
        event.preventDefault();
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
        setTimeout(onClose, 0);
    }


    if (!show)
        return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modalContent" onClick={(event => event.stopPropagation())}>
                <h1>New build</h1>
                <p>Enter the commit hash which you want to build.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        id="hash"
                        type="search"
                        name="hash"
                        value={inputs.hash || ""}
                        onChange={handleChange}
                        placeholder="Commit hash"
                        required
                    />
                    <div className="settingsButtons">
                        <Button buttonType="colored">
                            <p>Run build</p>
                        </Button>
                        <Button buttonType="default" action={onClose}>
                            <p>Cancel</p>
                        </Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Modal;