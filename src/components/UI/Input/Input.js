import React from 'react';
import classes from './Input.css';

const input = (props) => {

    const {inputType, ...elementProps} = props;

    const inputTypes = {
        input: <input className={classes.InputElement} {...elementProps} />,
        textarea: <textarea className={classes.InputElement} {...elementProps}>{elementProps.children}</textarea>
    }

    const input = inputTypes[inputType] ? inputTypes[inputType] : inputTypes.input;

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    )
}

export default input;