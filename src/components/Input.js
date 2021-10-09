function Input({placeholder, value, name, handleChange, doReset, required}) {
    return (
        <div className="search-wrapper">
            <input
                id={name}
                type="text"
                name={name}
                value={value || ""}
                onChange={handleChange}
                placeholder={placeholder}
                className="search-box"
                required={required}
            />
            {value ? <button type="reset" name={name} onClick={doReset} className="close-icon"/> : <></>}
        </div>
    )
}

export default Input;