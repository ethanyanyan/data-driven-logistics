function DefaultInput({ name, type, placeholder, value, onChange }) {
    return (
        <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default DefaultInput;