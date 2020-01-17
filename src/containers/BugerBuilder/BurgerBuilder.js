import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSumary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
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
        alert('You continue!');
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

        return (
            <Aux>
                <Modal show={this.state.purchasing} closed={this.modalClosed}>
                    <OrderSumary
                        ingredients={this.state.ingredients}
                        closed={this.modalClosed}
                        continue={this.purchaseContinueHandler}
                        totalPrice={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ordered={this.purchasingHandler} purchaseable={this.state.purchaseable} totalPrice={this.state.totalPrice} disabledInfo={disabledInfo} addIngredientsHandler={this.addIngredientsHandler} removeIngredientsHandler={this.removeIngredientsHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;