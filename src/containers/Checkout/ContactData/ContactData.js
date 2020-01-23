import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Zip Code'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest'
            }
        },
        formIsValid: false,
        loading: false
    }

    checkvalidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }
    
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }
    
    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const formData = {};
        for (let formDataIndentifier in this.state.orderForm) {
            formData[formDataIndentifier] = this.state.orderForm[formDataIndentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangedHandler = (event, inputIdentifier) => {
        let orderForm = {...this.state.orderForm};
        orderForm[inputIdentifier].value = event.target.value;
        orderForm[inputIdentifier].valid = this.checkvalidity(event.target.value, orderForm[inputIdentifier].validation);
        orderForm[inputIdentifier].touched = true;

        let formIsValid = true;
        for (let inputIdentifier in orderForm) {
            formIsValid = (orderForm[inputIdentifier].valid || !orderForm[inputIdentifier].validation) && formIsValid;
        }

        this.setState({orderForm, formIsValid});
    }

    render() {
        const elements = [] ;
        for (let key in this.state.orderForm) {
            elements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        return (
            <div className={classes.ContactData}>
                {
                    this.state.loading ?
                        <Spinner />
                    : (
                        <React.Fragment>
                            <h4>Enter your Contact Data</h4>
                            <form onSubmit={this.orderHandler}>
                                {
                                    elements.map(element => {
                                        return <Input
                                            key={element.id}
                                            elementType={element.config.elementType}
                                            elementConfig={element.config.elementConfig}
                                            value={element.config.value}
                                            invalid={!element.config.valid}
                                            shouldValidate={element.config.validation}
                                            touched = {element.config.touched}
                                            changed={(event) => this.inputChangedHandler(event, element.id)} />;
                                    })
                                }
                                <Button type="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                            </form>
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default ContactData;