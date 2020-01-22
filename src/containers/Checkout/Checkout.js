import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        price: null
    }

    componentDidMount() {
        const search = new URLSearchParams(this.props.location.search);
        let ingredients = {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        };

        let price = null;

        for (let param of search.entries()) {
            if (Object.keys(ingredients).indexOf(param[0]) !== -1) {
                ingredients[param[0]] = +param[1];
                continue;
            }
            price = +param[1];
        }

        this.setState({ingredients, price});
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
                <Route path={`${this.props.match.path}/contact-data`} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;