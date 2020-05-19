import React from "react";
import "./ErrorText.scss";

/**
 * @description if props.error is truthy then we should the error in red text
 * @param {error: string }props
 */
const ErrorText = (props: { error: string }) => {
    return (
        <p className="error_text" style={{visibility: props.error ? "visible" : "hidden"}}>
            * {props.error}
        </p>
    );
}

export default ErrorText;
