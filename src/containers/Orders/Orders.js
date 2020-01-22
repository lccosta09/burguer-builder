import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                let orders = [];
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        id: key
                    });
                }

                this.setState({orders, loading: false});
            }).catch(error => {
                this.setState({loading: false, error: true});
            });
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        }

        if (this.state.error) {
            return <p>Can't load orders</p>
        }

        return (
            <div>
                {
                    this.state.orders.map(order => {
                        return <Order key={order.id} {...order} />;
                    })
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);