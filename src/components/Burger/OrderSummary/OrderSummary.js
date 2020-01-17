import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to chekcout?</p>
            <Button type="Danger" clicked={props.closed}>CANCEL</Button>
            <Button type="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;