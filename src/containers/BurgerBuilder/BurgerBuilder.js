import React, { Component } from "react";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Aux";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';







export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
   };

  componentDidMount(){
    /*console.log('this.props',this.props)
    axios.get('https://reactapp-f62dc.firebaseio.com/Ingredients.json').then(response=>{
             this.setState({ingredients:response.data});
    }).catch(error=>{
      this.setState({error:true});
    });*/
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

 

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
    this.setState({ purchasing: true });
    } else{
      this.props.onAuthRedirectPath('checkout');
      this.props.history.push('/auth');
    }
  };
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary=null;
  let burger= this.props.error?<div>><p>Ingredients cannot be loaded</p></div>:<Spinner/>;
  if(this.props.ings){
  burger=(
  <Aux>
  <Burger ingredients={this.props.ings} />
  <BuildControls
    ingredientsAdded={this.props.onIngredientAdded}
    ingredientsRemoved={this.props.onIngredientRemoved}
    disabled={disabledInfo}
    price={this.props.price}
    purchasable={this.updatePurchaseState(this.props.ings)}
    ordered={this.purchaseHandler}
    isAuth={this.props.isAuthenticated}
  /></Aux>);
  orderSummary=<OrderSummary
    ingredients={this.props.ings}
    purchaseCanceled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler}
    price={this.props.price && this.props.price.toFixed(2)}
  />
  
  }

  
    
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
       {burger}
      </Aux>
    );
  }
}

const mapStateToProps=state =>{
return{
  ings:state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token!==null
}
};

const mapDispatchToProps=dispatch=> {
return{
  onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
  onInitIngredients:()=> dispatch(actions.initIngredients()),
  onInitPurchase:()=>dispatch(actions.purchaseInit()),
  onAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
}
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
