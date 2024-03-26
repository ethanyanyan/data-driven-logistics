import React, {useState, useEffect} from "react"
import {FaSearch} from "react-icons/fa";


// TODO: Can parent component own potential results and filtering function

function Search({ name, type, placeholder, value, onChange, data = [] }) {

    // const elementRef = useRef(null)
    
    const [filteredList, setFilteredList] = useState(data)
    const [isFocused, setIsFocused] = useState(false)
    const [firstResHeight, setFirstResHeight] = useState(0)
    const [resHeight, setResHeight] = useState(0)


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
        setResHeight(firstResHeight * newFilteredList.length)
        console.log(`set height triggered to ${firstResHeight * newFilteredList.length}`)
    }, [value])

    function handleFocus() {
        setIsFocused(true)
        setResHeight(firstResHeight * filteredList.length)
    }

    function handleBlur() {
        setIsFocused(false)
        setResHeight(0)
    }

    // The list of results should appear whenever 
    // The search bar is clicked and disappear whenever
    // it loses focus


    return (
        <div id = "search-container">
            <div className="search-bar">
                <FaSearch id="search-icon"/>
                <input 
                    type="text"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <SearchResults 
                height={resHeight} 
                isFocused={isFocused}
                filteredList={filteredList}/>
        </div>
        
    )
}

function SearchResults({height=0, isFocused, filteredList}) {
    return (
        <div
                className={`search-results ${isFocused ? "show-results" : ""}`}
                style={{height: height}}>
                {filteredList.map((company, idx) => (
                    <div key={`company-${idx}`}>
                        {company}
                    </div>
                ))}
            </div> 
    )
}

export default Search
