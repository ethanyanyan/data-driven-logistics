function DefaultInput({ name, type, placeholder}) {
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