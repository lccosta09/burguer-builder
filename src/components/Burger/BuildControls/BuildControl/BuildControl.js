import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button disabled={ props.disabledInfo[props.type] } className={classes.Less} onClick={() => props.removeIngredientsHandler(props.type)} >Less</button>
            <button className={classes.More} onClick={() => props.addIngredientsHandler(props.type)}>More</button>
        </div>
    );
}

export default buildControl;