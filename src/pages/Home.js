import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div className={'home'}>
        <Jumbotron>
          <h1
            style={{
              textAlign: 'center',
              fontSize: '8rem',
              fontWeight: 'bold'
            }}
          >
            Goa Cellar
          </h1>
          <p
            style={{
              textAlign: 'center',
              padding: '0px 15px 0px 15px'
            }}
            >
            An example app using reduxa with goa.
          </p>
        </Jumbotron>
      </div>
    );
  }
}
