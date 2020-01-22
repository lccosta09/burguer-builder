import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';

import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        };

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div className={classes.ContactData}>
                {
                    this.state.loading ?
                        <Spinner />
                    : (
                        <React.Fragment>
                            <h4>Enter your Contact Data</h4>
                            <form>
                                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                                <input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
                                <input className={classes.Input} type="text" name="street" placeholder="Steet" />
                                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                                <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
                            </form>
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default ContactData;