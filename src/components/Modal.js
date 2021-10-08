import {useState} from 'react';
import Button from './Button.js'
import './css/Modal.css';


function Modal({show, onClose}) {
    const [inputs, setInputs] = useState({hash: ''})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }


    // Не очень понятно, что же нужно было сделать при нажатии на Run Build,
    // потому что не надо было делать страницу ногово билда, поэтому я не делаю
    // ничего, но на всякий случай храню состояние с хэшем
    const handleSubmit = (event) => {
        event.preventDefault();
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