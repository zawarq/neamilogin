import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormErrors } from './util/FormErrors';
import superagent from 'superagent';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        };
    }

    validateForm() {
        return this.state.formValid;
    }

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                if (emailValid) {
                    emailValid = value.length <= 256;
                    fieldValidationErrors.email = emailValid ? '' : 'Email length should be less than 256 characters';
                }
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
                if (passwordValid) {
                    passwordValid = value.length <= 50;
                    fieldValidationErrors.password = passwordValid ? '' : 'Password length should be less than 50 characters';
                }
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            formValid: emailValid && passwordValid
        }, this.validateForm);

    }

    handleSubmit = event => {
        superagent
            .post('api/Account/Login')
            .send({ email: this.state.email, password: this.state.password })
            .set('Accept', 'application/json')
            .then(() => {
                this.props.history.push('/');
            })
            .catch(() => {
                this.setState({
                    email: "",
                    password: "",
                    formErrors: { email: '', password: '', login: 'Invalid User name or password' },
                    emailValid: false,
                    passwordValid: false,
                    formValid: false
                });
            });
        event.preventDefault();
    }

    render() {
        return (
            <div id="login">
                <div className="container">
                    <div id="login-row" className="row justify-content-center align-items-center">
                        <div id="login-column" className="col-sm-6">
                            <div id="login-box" className="col-sm-12">
                                <form id="login-form" onSubmit={this.handleSubmit}>
                                    <h3 className="text-center">Login</h3>
                                    <div className="panel panel-default">
                                        <FormErrors formErrors={this.state.formErrors} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" value={this.state.password} name="password" onChange={this.handleChange} className="form-control" />
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-6"></label>
                                        <Link to="/register" className="col-sm-6 text-right">Register here</Link>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary" disabled={!this.validateForm()} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}