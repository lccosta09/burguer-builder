import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSumary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        loadingIngredientsError: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                this.updatePurchaseState(response.data);
            })
            .catch(error => {
                this.setState({loadingIngredientsError: true});
            });
    }

    updatePurchaseState = (ingredients) => {
        const totalProducts = Object.keys(ingredients).map((ingredient) => {
            return ingredients[ingredient];
        }).reduce((sum, element) => {
            return sum + element;
        }, 0);

        this.setState({purchaseable: totalProducts > 0})
    }

    purchasingHandler = (purchasing) => {
        this.setState({purchasing});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        // this.setState({loading: true});

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice
        // };

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({purchasing: false, loading: false});
        //     })
        //     .catch(error => {
        //         this.setState({purchasing: false, loading: false});
        //     });
    }

    modalClosed = () => {
        this.purchasingHandler(false);
    }

    addIngredientsHandler = (type) => {
        let ingredients = {...this.state.ingredients};
        ingredients[type] += 1;
        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients, totalPrice});
        this.updatePurchaseState(ingredients);
    }

    removeIngredientsHandler = (type) => {
        let ingredients = {...this.state.ingredients};

        if (ingredients[type] <= 0) {
            return;
        }

        ingredients[type] -= 1;
        const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients, totalPrice});
        this.updatePurchaseState(ingredients);
    }

    render() {
        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        if (this.state.loadingIngredientsError) {
            return <p>Ingredients can't be loaded</p>
        }

        if (!this.state.ingredients) {
            return <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closed={this.modalClosed}>
                    {
                        this.state.loading ?
                            <Spinner /> :
                            <OrderSumary
                                ingredients={this.state.ingredients}
                                closed={this.modalClosed}
                                continue={this.purchaseContinueHandler}
                                totalPrice={this.state.totalPrice}
                            />
                    }
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ordered={this.purchasingHandler} purchaseable={this.state.purchaseable} totalPrice={this.state.totalPrice} disabledInfo={disabledInfo} addIngredientsHandler={this.addIngredientsHandler} removeIngredientsHandler={this.removeIngredientsHandler} />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);