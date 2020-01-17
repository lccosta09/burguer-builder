import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
    const controls = [
        { label: 'Salad', type: 'salad' },
        { label: 'Bacon', type: 'bacon' },
        { label: 'Cheese', type: 'cheese' },
        { label: 'Meat', type: 'meat' }
    ];

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            { controls.map((control) => {
                return <BuildControl disabledInfo={props.disabledInfo} key={control.type} label={control.label} type={control.type} addIngredientsHandler={props.addIngredientsHandler} removeIngredientsHandler={props.removeIngredientsHandler} />
            }) }
            <button
                disabled={!props.purchaseable}
                className={classes.OrderButton}
                onClick={() => props.ordered(true)}
            >ORDER NOW</button>
        </div>
    );
}

export default buildControls;