function Input({placeholder, value, name, handleChange, doReset, required, autofocus, pattern}) {
    return (
        <div className="search-wrapper">
            <input
                ref={autofocus}
                id={name}
                type="text"
                name={name}
                value={value || ""}
                onChange={handleChange}
                placeholder={placeholder}
                className="search-box"
                required={required}
                pattern={pattern}
            />
            {value ? <button type="reset" name={name} onClick={doReset} className="close-icon"/> : <></>}
        </div>
    )
}

export default Input;