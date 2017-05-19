import React, { PropTypes, Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import goaLogo from './goa-logo.svg';

class App extends Component {
  static propTypes = {
    children: PropTypes.any,
    accountSelection: PropTypes.object.isRequired,
  };
  static defaultProps = {
    ...Component.defaultProps,
    children: false,
  }

  render() {
    return (
      <div id="main">
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <span className="logo">
                <IndexLinkContainer to="/home">
                  <img
                    alt="Logo"
                    src={goaLogo}
                    width="50px"
                  />
                </IndexLinkContainer>
              </span>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse eventKey={0}>
            <Nav bsStyle="pills" pullLeft>
              <LinkContainer to="/accounts">
                <NavItem eventKey={1}>Accounts</NavItem>
              </LinkContainer>
              { this.props.accountSelection.id !== 0 && <LinkContainer to="/bottles">
                <NavItem eventKey={2}>Bottles</NavItem>
              </LinkContainer>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className={'appContent'}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, accountSelection: state.accountSelection };
}
export default connect(mapStateToProps)(App);
