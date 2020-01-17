import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {
                    Object.keys(props.ingredients).map(ingredient => {
                        return <li key={ingredient}><span style={{textTransform: 'captalize'}}>{ ingredient }</span>: {props.ingredients[ingredient]}</li>
                    })
                }
            </ul>
            <p>Continue to chekcout?</p>
        </Aux>
    );
}

export default orderSummary;