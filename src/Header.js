import React from "react";
import logo from './Resources/images/lazada.png';
import cart from './Resources/images/cart.png';
import {connect} from "react-redux";

class Header extends React.Component {
    checkOut=()=>{
        const {props:{reduxState}} = this;
        if(!reduxState.isLoginSuccess){
            this.props.showPage('Login');
        } else {
            this.props.showPage('Checkout');
        }
    }

    render() {
        const {props:{reduxState}} = this;
        return (
            <div className="seacrh-form" style={{ padding: '10px', display: 'flex' }}>
                <img src={logo} className="logo-cls" alt="logo" style={{ marginRight: '40px' }} />
                <input type="text" name="search" placeholder="Search in Lazada" />
                <div className="search-cls" onClick={() => this.props.showPage('Products')}>GO</div>
                <li>
                    <img src={cart} alt="checkout" style={{ width: '30px', height: '35px', margin: '10px 15px', cursor: 'pointer' }} onClick={this.checkOut} />
                    <span className="cart-count-cls">{reduxState.cartItems.length}</span>
                </li>
            </div>
        )
    }
}

export default connect((state)=>{
    return {reduxState : state};
}, null)(Header);