import React from 'react';
import classes from './Input.css';

const input = (props) => {
    const options = props.elementConfig.options || [];

    const elementTypes = {
        input: <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value} />,
        textarea: <textarea
                className={classes.InputElement}
                {...props.elementConfig}>{props.value}</textarea>,
        select: <select 
                className={classes.InputElement}
                value={props.value}
            >
                {
                    options.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayValue}</option>
                    })
                }
            </select>
    }

    const input = elementTypes[props.elementType] ? elementTypes[props.elementType] : elementTypes.input;

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {input}
        </div>
    )
}

export default input;