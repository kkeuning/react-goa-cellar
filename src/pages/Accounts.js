import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AccountsTable from '../tables/Accounts';
import { loadAccounts } from '../manageAccounts';
import { clearAccountSelection } from '../redux/accountSelection';

class Accounts extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.dispatch(clearAccountSelection());
    loadAccounts(this.props.dispatch);
  }

  refresh() {
    loadAccounts(this.props.dispatch);
  }

  render() {
    return (
      <AccountsTable
        accounts={this.props.accounts}
        dispatch={this.props.dispatch}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts
  };
}
export default connect(mapStateToProps)(Accounts);
