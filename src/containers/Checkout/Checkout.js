import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    componentDidMount() {
        const search = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for (let param of search.entries()) {
            ingredients[param[0]] = +param[1];
        }

        this.setState({ingredients});
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    ingredients={this.state.ingredients}
                />
            </div>
        );
    }
}

export default Checkout;