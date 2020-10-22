import React from "react";
import { connect } from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: ""
        }
    }

    componentDidMount = () => {

    }

    login = () => {
        const { props: { dispatch } } = this;
        if (this.state.userName === "admin"
            && this.state.password === "admin") {
            dispatch({ type: 'LOGIN_USER', payload: true });
            this.props.history.push('/Checkout');
        }
    }

    changeuserName = (e) => {
        this.setState({ userName: e.target.value })
    }

    changePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        return (
            <div style={{height: '500px'}}>
                <div className="login-form">
                    <div style={{ justifyContent: 'center', textAlign: 'center', background: '#f7f4f4', height: 'auto', padding: '30px' }}>
                        <div style={{ float: 'left', color: '#1d0707', fontWeight:'bold', marginBottom:"12px" }}>LOGIN</div>
                        <div>
                            <input type="text" value={this.state.userName} placeholder="Enter Username as admin" name="uname" onChange={this.changeuserName.bind(this)} required></input>
                        </div>
                        <div>
                            <input type="password" value={this.state.password} placeholder="Enter Password as admin" name="psw" onChange={this.changePassword.bind(this)}></input>
                        </div>
                        <input type="submit" name="submit" value="Continue" onClick={this.login}></input>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(Login);
