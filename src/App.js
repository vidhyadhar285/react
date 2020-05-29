import React, { useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asynchComponent from "./hoc/aSynchComponent/aSynchComponent";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import LogOut from "./containers/Auth/LogOut/LogOut";
import * as actions from "./store/actions/index";

const asynchCheckout = asynchComponent(() => {
  return import("./containers/BurgerBuilder/Checkout/Checkout");
});

const asynchOrders = asynchComponent(() => {
  return import("./containers/Orders/Orders");
});

const asynchAuth = asynchComponent(() => {
  return import("./containers/Auth/Auth");
});

const app = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={asynchAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={asynchCheckout} />
        <Route path="/orders" component={asynchOrders} />
        <Route path="/logout" component={LogOut} />
        <Route path="/auth" component={asynchAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)
);
