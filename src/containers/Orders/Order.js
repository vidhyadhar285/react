import React from 'react';
import classes from './Order.module.css';

const Order=(props)=>{
const ingredients=[];
for(let ingredientName in props.ingredients){
    ingredients.push(
        {
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        }
    )
};

const ingredientOutPut=ingredients.map(ig=>{
return <span>{ig.name}({ig.amount})</span>
});

return(
<div className={classes.Order}>
    <p>Ingredients:{ingredientOutPut}</p>
    <p>Price:{props.price}</p>
   
  </div>
    );
    
};

export default Order;