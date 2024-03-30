function DefaultInput({ name, type, placeholder, onChange, data = null }) {
    return (
        <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
        />
    )
}

export default DefaultInput;