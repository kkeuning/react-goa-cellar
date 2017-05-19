import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BottlesTable from '../tables/Bottles';
import { loadBottles } from '../manageBottles';

class Bottles extends Component {
  static propTypes = {
    bottles: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    accountSelection: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (this.props.accountSelection.id === 0) {
      window.location.assign('/');
    } else {
      loadBottles(this.props.accountSelection.id, this.props.dispatch);
    }
  }

  render() {
    return (
      <BottlesTable
        bottles={this.props.bottles}
        dispatch={this.props.dispatch}
        accountSelection={this.props.accountSelection}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    bottles: state.bottles,
    accountSelection: state.accountSelection
  };
}
export default connect(mapStateToProps)(Bottles);
