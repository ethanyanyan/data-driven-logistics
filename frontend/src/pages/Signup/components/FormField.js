import React, {useMemo, useEffect} from "react"
import Selector from "./inputs/Selector"
import Search from "./inputs/Search"
import DefaultInput from "./inputs/Default"

/**
 * FormField component.
 * Handles switching between default case
 * of text input and other cases like
 * the role selector and company finder
 * based on the type prop.
 * 
 * @param {string} name - The name attribute for the input/select element. Used for className and id attributes.
 * @param {string} type - The type of the input element (e.g., 'text', 'password', 'select').
 * @param {string} placeholder - The placeholder text for the input/select element.
 * @param {string} value - The current value of the input/select element (state variable).
 * @param {function} onChange - The callback function to handle input changes.
 * @returns {JSX.Element} - The rendered FormField component.
 */
function FormField(props) {

    // Select which type of Input component to render
    let Input = DefaultInput;
    if (props.type === "select") {
        Input = Selector;
    } else if (props.type === "search") {
        Input = Search;
    }

    return (
        <fieldset className={props.name}>

            <label htmlFor={props.name} className="visually-hidden">
                {props.placeholder}
            </label>

            { <Input {...props} /> }

        </fieldset>
    )
}

export default FormField