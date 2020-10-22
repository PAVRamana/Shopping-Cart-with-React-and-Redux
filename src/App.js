import React, { Component } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Header from "./Header";
import Products from "./Products/Products";
import Checkout from "./Checkout/Checkout";
import Login from "./Login/Login";
import { connect } from "react-redux";
import './Resources/css/App.css';

class App extends Component {

  showPage = (path) => {
    this.props.history.push('/' + path);
  }

  render() {
    const { props: { reduxState } } = this;
    return (
      <div className="app-root">
        <div className="app-header">
          <Header showPage={this.showPage} />
        </div>
        <div style={{ background: '#d2cbcb' }}>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/Products" component={Products} />
            <Route exact path="/Checkout">
              {reduxState.isLoginSuccess ? <Checkout showPage={this.showPage} /> : <Redirect to="/Login" />}
            </Route>
            <Route exact path="/Login" component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect((state) => {
  return { reduxState: state };
}, null)(App));