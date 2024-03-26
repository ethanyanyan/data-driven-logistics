import React, {useState, useEffect} from "react"

function Selector({ name, type, placeholder, value, onChange, data = [] }) {

    return (
        <select id={name} name={name} value={value} onChange={onChange}>
            <option>{placeholder}</option>
            {data.map((role, idx) => (
                <option key={`role-${idx}`}>{role}</option>
            ))}
        </select>
    )
}

export default Selector