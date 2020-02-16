import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import './Login.css';

class Login extends Component {

    state = {
        username: "",
        password: "",
        hasError: false,
        isLoading: false
    }


    handleSubmit = (e) => {

        e.preventDefault();

        if (this.state.username.length > 0 && this.state.password.length > 0) {

            this.setState({ isLoading: true, hasError: false });

            fetch("https://5e40515569618d001411faa5.mockapi.io/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
                .then(res => res.json())
                .then((res) => {
                    if (res && res.userId > 0) {
                        this.props.setUser(res.userId);
                    }
                });

        }
        else {
            this.setState({ hasError: true });
        }

    }

    handleUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    render() {
        return (
            <div id="login-container">
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <div id="title-text">Kite</div>
                    <label className="login-label" htmlFor="name">Username</label>
                    <input onChange={this.handleUsername} className="login-box" type="text" id="name"></input>
                    <label className="login-label" htmlFor="password">Password</label>
                    <input onChange={this.handlePassword} className="login-box" type="password" id="name"></input>
                    <input id="submit-button" type="submit" value="Login"></input>
                    {this.state.hasError && <div className="error-message">Please complete all required fields!</div>}
                    {this.state.isLoading && <div className="spinner-container"><Spinner animation="border" variant="danger" /></div>}
                </form>
            </div>
        );
    }
}

export default Login;