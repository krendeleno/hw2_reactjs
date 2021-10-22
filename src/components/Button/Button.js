import './Button.css';


function Button({buttonType, children, action, disabled, show}) {

    if (show === undefined)
        show = true;

    if (!show)
        return null

    return (
        <button className={buttonType} onClick={action} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button;