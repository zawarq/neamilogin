import React, { Component } from 'react';

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

    render() {
        return (
            <div>
                {
                    (this.state.user != null && this.state.user.firstName != null) &&
                    <h1>Hello, {this.state.user.firstName} {this.state.user.lastName}!</h1>
                }
                <p>Welcome to the Neami Login Demo!</p>
            </div>
        );
    }
}