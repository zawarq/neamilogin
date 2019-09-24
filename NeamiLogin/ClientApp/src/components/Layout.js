import React, { Component } from 'react';
import { Container } from 'reactstrap';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <React.Fragment>
                <div class="mt-5 pt-5">
                    <Container>
                        {this.props.children}
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}
