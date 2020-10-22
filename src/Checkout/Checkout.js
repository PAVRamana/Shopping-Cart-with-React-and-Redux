import React from "react";
import { connect } from "react-redux";
import close from "../Resources/images/close.png";

class Checkout extends React.Component {

 constructor(props) {
    super(props)
    this.state = {
        cartItems: [],
        visaType: '',
        cardNumber: '',
        cvvNumber: '',
        month: '',
        year: '',
        delemeter: '/'
    }
}

removeItemFromCart = (cartItem) => {
    const { props: { reduxDispatch } } = this;
    reduxDispatch({ type: 'REMOVE_CART_ITEM', payload: cartItem });
}

backToShop = () => {
    this.props.showPage('Products');
}

checkoutItems = () => {
    const { props: { reduxState } } = this;
    if (reduxState.cartItems.length > 0) {
        alert("CHECKOUT ITEMS");
    }
}

onChangeCardNumber = (e) => {
    let value = e.target.value;
    if (value !== "") {
        if (Number(value)) {
            value.length > 16 ? this.setState({ cardNumber: this.state.cardNumber })
                : this.setState({ cardNumber: value });
        }
    } else {
        this.setState({ cardNumber: "" });
    }
}

onChangeCvv = (e) => {
    let value = e.target.value;
    if (value !== "") {
        if (Number(value)) {
            value.length > 3 ? this.setState({ cvvNumber: this.state.cvvNumber })
                : this.setState({ cvvNumber: value });
        }
    } else {
        this.setState({ cvvNumber: "" });
    }
}

onChangeMonth = (e) => {
    let value = e.target.value;
    if (value !== "") {
        if (Number(value)) {
            if (value >= 1 && value <= 12) {
                this.setState({ month: value });
            } else {
                this.setState({ month: this.state.month });
            }
        }
    } else {
        this.setState({ month: "" });
    }
}

onChangeYear = (e) => {
    let value = e.target.value;
    if (value !== "") {
        //if (!Object.is(Number(value), NaN)) {
        if (Number(value)) {
            if (value.length < 4) {
                this.setState({ year: value });
            } else if (value.length > 4) {
                this.setState({ year: this.state.year });
            } else if (value.length === 4) {
                if (value >= 2020) {
                    this.setState({ year: value });
                } else {
                    this.setState({ year: this.state.year });
                }
            }
        }
    } else {
        this.setState({ year: "" });
    }
}

getAllCartItems = () => {
    const { props: { reduxState } } = this;
    if (reduxState.cartItems.length > 0) {
        let totalCount = 0;
        let items = reduxState.cartItems.map((item, index) => {
            totalCount += item.cost * item.count;
            return <tr key={index}>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>{item.cost * item.count}</td>
                <td>
                    <img style={{ cursor: 'pointer' }} onClick={this.removeItemFromCart.bind(this, item)} src={close} width={15} height={15} alt=""></img>
                </td>
            </tr>
        })
        return <table className="items-table-cls"><tbody>{items}
            <tr style={{ border: 'none', background: 'none' }}>
                <td onClick={this.backToShop} style={{ cursor: 'pointer', color: '#A1A2A0' }}>Back To Shop</td><td> Subtotal:</td><td>{totalCount}</td><td> </td>
            </tr>
        </tbody></table>
    } else {
        return (<React.Fragment>
            <div className="empty-cart"> Your Cart is Empty.</div>
            <div onClick={this.backToShop} style={{ padding: '30px', cursor: 'pointer', color: '#A1A2A0' }}>Back To Shop</div>
        </React.Fragment>)
    }
}

onVisaType = (type) => {
    this.setState({ visaType: type });
}

render() {

    let cartItems = this.getAllCartItems();
    return (
       <div className="checkout-root">
            <div style={{ display: "flex", width: '800px', border: '1px solid #a09b9b' }}>
                <div style={{ width: '80%', background: '#ECF0F1' }}>
                    <div style={{ padding: '30px', color: '#A1A2A0', fontSize: '17px' }}>Your Shopping Cart</div>
                    <div style={{ height: '400px', overflowY: 'scroll' }}>{cartItems}</div>
                </div>

                <div className="checkout" style={{ width: '400px', height: '500px', background: '#483E3C' }}>
                    <div style={{ padding: '50px' }}>
                        <div style={{ color: '#968232', marginBottom: '50px', fontSize: '17px' }}>Card Details</div>
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ marginBottom: '15px', color: '#fff' }}>Select Card Type</div>
                            <div style={{ display: "flex", marginBottom: '10px' }}>
                                <span className="card-type-cls" style={{ background: this.state.visaType === "visa" ? '#968232' : '#fff' }} onClick={this.onVisaType.bind(this, "visa")}>Visa</span>
                                <span className="card-type-cls" style={{ background: this.state.visaType === "master" ? '#968232' : '#fff' }} onClick={this.onVisaType.bind(this, "master")}>Master</span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '30px' }}>
                            <div style={{ marginBottom: '15px', color: '#fff' }}>Card Number</div>
                            <input className="number-cls" style={{ marginBottom: '20px', width: '135px' }}
                                type="text"
                                value={this.state.cardNumber}
                                onChange={this.onChangeCardNumber.bind(this)}></input>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '75%' }}>
                                <div style={{ marginBottom: '15px', color: '#fff' }}>Expiry Date</div>
                                <input type="text" className="number-cls" style={{ marginBottom: '20px', width: '20px' }}
                                    value={this.state.month} onChange={this.onChangeMonth.bind(this)}></input>{this.state.delemeter}
                                <input type="text" className="number-cls" style={{ marginBottom: '20px', width: '40px' }}
                                    value={this.state.year} onChange={this.onChangeYear.bind(this)}></input>
                            </div>
                            <div>
                                <div style={{ marginBottom: '15px', color: '#fff' }}>CVV</div>
                                <input type="text" className="number-cls" style={{ marginBottom: '20px', width: '25px' }}
                                    value={this.state.cvvNumber}
                                    onChange={this.onChangeCvv.bind(this)}></input>
                            </div>
                        </div>
                    </div>
         
                    <div className="checkout-footer">
                        <div onClick={this.checkoutItems} style={{ textAlign: "center", cursor: 'pointer' }}>CheckOut</div>
                    </div>
                </div>
            </div>
        </div>
    )
 }
}

export default connect((state) => {return { reduxState: state };
}, (dispatch) => {return { reduxDispatch: dispatch };
})(Checkout);