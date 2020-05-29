import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger=(props)=>{
let transformedIngredients=Object.keys(props.ingredients).map(igkey=>{
    return [...Array(props.ingredients[igkey])].map((_,i) => {

    return <BurgerIngredient key={igkey+1} type={igkey}></BurgerIngredient>;
    
   });
}).reduce((arr,ele)=>{
    return arr.concat(ele)
},[]);

if(transformedIngredients.length===0){
    transformedIngredients=<p>please start adding ingredients</p>
}
return(
    <div className={classes.Burger}>
<BurgerIngredient type="bread-top"></BurgerIngredient>
{transformedIngredients}
<BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
);
};

export default burger;