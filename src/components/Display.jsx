import React from "react";
import './css/display.css'

export default (props) => {
    return(
        <div className="display">
            {props.value}
        </div>
    )
}