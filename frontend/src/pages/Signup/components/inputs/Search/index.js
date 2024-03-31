import React, {useState, useEffect} from "react"
import {FaSearch} from "react-icons/fa";


// TODO: Can parent component own potential results and filtering function

function Search({ name, placeholder, data = [], titles=[] }) {
    
    const [filteredList, setFilteredList] = useState(data)
    const [isFocused, setIsFocused] = useState(false)
    const [firstResHeight, setFirstResHeight] = useState(0)
    const [resHeight, setResHeight] = useState(0)
    const [value, setValue] = useState("")
    

    useEffect(() => {
        const results = document.getElementsByClassName("search-results")[0]
        if (results) {
            const firstRes = results.firstElementChild
            if (firstRes){
                const h = parseInt(window.getComputedStyle(firstRes).getPropertyValue('height'));
                setFirstResHeight(h)
            }
        }
    }, [])

    useEffect(() => {
        const newFilteredList = data.filter(item => item.toLowerCase().includes(value.toLowerCase()))
        setFilteredList(newFilteredList)
        if (isFocused) {
            setResHeight(firstResHeight * newFilteredList.length)
        }
        else {
            setResHeight(0)
        }
    }, [value, data])

    function handleFocus() {
        setIsFocused(true)
        setResHeight(firstResHeight * filteredList.length)
    }

    function handleBlur() {
        setIsFocused(false)
        setResHeight(0)
    }

    function handleChange(e) {
        setValue(e.target.value)
    }

    return (
        <div id = "search-container">
            <div className="search-bar">
                <FaSearch id="search-icon"/>
                <input 
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => handleChange(e)}
                    placeholder={placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <SearchResults 
                height={resHeight} 
                isFocused={isFocused}
                filteredList={filteredList}
                titles={titles}
                name={name}/>
        </div>
        
    )
}

function SearchResults({height=0, isFocused, filteredList, name, titles}) {

    function handleResultClicked(e) {
        document.getElementById(name).value = e
    }

    return (
        <div
                className={`search-results ${isFocused ? "show-results" : ""}`}
                style={{height: height}}>
                {filteredList.map((company, idx) => (
                    <div 
                        key={`company-${idx}`} 
                        onClick={() => handleResultClicked(company)}
                        title={titles ? titles[idx] : ""}
                    >
                        {company}
                    </div>
                ))}
            </div> 
    )
}

export default Search


// TIME:

// TODO: 
// Create new user on backend
// Perform logic for validation functions
// Handle displaying server-side error
// Cleanup and organization
// Documentation

// 8:00 - 9:20 Implementing logic for validation functions, working on creating new user on backend from frontend form