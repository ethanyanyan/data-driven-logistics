// TODO: fetch companies list from backend

import React, {useState} from "react"

const companies_list = [
    "Walmart",
    "Amazon",
    "Sears",
    "Lowes",
    "Home Depot"
]

function CompanySearch({ name, type, placeholder, value, onChange }) {

    const [filteredList, setFilteredList] = useState(companies_list)

    function filterResults() {

    }

    function companySearchChange(e) {
        // Start by calling the onChange function from SignupForm.js
        onChange(e)
        setFilteredList(companies_list.filter(item => item.includes(value)))
    }


    return (
        <div>
            <input 
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={companySearchChange}
            />
            <ul>
                {filteredList.map((company, idx) => (
                    <div key={`company-${idx}`}>
                        {company}
                    </div>
                ))}
            </ul>
        </div>
        
    )
}

export default CompanySearch