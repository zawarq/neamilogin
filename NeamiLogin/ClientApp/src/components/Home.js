import React, { Component } from 'react';
import superagent from 'superagent';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { loading: true };

        fetch('api/Account/GetUser')
            .then(response => { return response.json(); })
            .then(data => {
                if (data.firstName == null) {
                    this.props.history.push('/login');
                }
                this.setState({ user: data, loading: false });
            });
    }

    logout = event => {
        superagent
            .post('/api/Account/Logout')
            .send({})
            .set('Accept', 'application/json')
            .then(res => {
                this.props.history.push('/login');
            });
    }

    render() {
        return (
            <React.Fragment>
                <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
                    <div class="container">
                        <div class="collapse navbar-collapse" id="navbarResponsive">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item mx-0 mx-lg-1">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-white" to="/logout" onClick={this.logout}>Logout</NavLink>
                                    </NavItem>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div>
                    {
                        (this.state.user != null && this.state.user.firstName != null) &&
                        <h1>Hello, {this.state.user.firstName} {this.state.user.lastName}!</h1>
                    }
                    <p>Welcome to the Neami Login Demo!</p>
                </div>
            </React.Fragment>
        );
    }
}