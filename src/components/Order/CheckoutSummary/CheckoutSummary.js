import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css'
const checkoutSummary=(props)=>{
   return(
       <div className={classes.CheckoutSummary}>
          
           <div >
           we hope it tastes well
              <Burger ingredients={props.ingredients}></Burger>
           </div>
           <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
           <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
       </div>
   )
}
export default checkoutSummary;