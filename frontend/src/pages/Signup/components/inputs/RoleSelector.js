// TODO: connect to backend

const rolesList = [
    "Admin",
    "Contractor",
    "HR",
    "Employee",
    "Manager"
]

function RoleSelector({ name, type, placeholder, value, onChange }) {
    return (
        <select id={name} name={name} value={value} onChange={onChange}>
            <option>{placeholder}</option>
            {rolesList.map(role => (
                <option>{role}</option>
            ))}
        </select>
    )
}

export default RoleSelector