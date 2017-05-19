import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Alert, Well } from 'react-bootstrap';
import { insertBottle, editBottle, removeBottle } from '../manageBottles';
import { loadBottles } from '../manageBottles';

const selectRowProp = {
  mode: 'radio',
  clickToSelect: true
};

const colorOptions = ['red', 'white', 'rose', 'yellow', 'sparkling'];

class BottlesTable extends Component {
  static propTypes = {
    bottles: PropTypes.object.isRequired,
    accountSelection: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      alertMessage: [],
      alertType: 'info',
      alertVisible: false
    };
  }
  onAfterSaveCell = row => {
    const updatedRow = {
      name: row.name,
      id: row.id,
      vintage: parseInt(row.vintage, 10),
      varietal: row.varietal,
      vineyard: row.vineyard
    };
    if (isNaN(updatedRow.vintage)) {
      const msg = [];
      msg.push('Vintage should be a valid year.');
      this.setState({
        alertVisible: true,
        alertType: 'warning',
        alertMessage: msg
      });
      loadBottles(
        this.props.accountSelection.id,
        this.props.dispatch,
        false,
        error => {
          const msg = [];
          msg.push('Unable to complete the requested action.');
          if (error && error.response && error.response.data) {
            msg.push(error.response.data);
          }
          this.setState({
            alertVisible: true,
            alertType: 'danger',
            alertMessage: msg
          });
        }
      );
    } else {
      editBottle(
        this.props.accountSelection.id,
        updatedRow,
        this.props.dispatch,
        () => {
          const msg = [];
          msg.push('Sucessfully Updated');
          this.setState({
            alertVisible: true,
            alertType: 'success',
            alertMessage: msg
          });
          this.setState({ alertVisible: true, alertType: 'success' });
        },
        error => {
          const msg = [];
          msg.push('Unable to complete the requested action.');
          if (error && error.response && error.response.data) {
            msg.push(error.response.data);
          }
          this.setState({
            alertVisible: true,
            alertType: 'danger',
            alertMessage: msg
          });
        }
      );
    }
  };

  onDeleteRow = rowids => {
    removeBottle(
      this.props.accountSelection.id,
      rowids[0],
      this.props.dispatch,
      () => {
        const msg = [];
        msg.push('Successfully Deleted');
        this.setState({
          alertVisible: true,
          alertType: 'success',
          alertMessage: msg
        });
      },
      error => {
        const msg = [];
        msg.push('Unable to complete the requested action.');
        if (error && error.response && error.response.data) {
          msg.push(error.response.data);
        }
        this.setState({
          alertVisible: true,
          alertType: 'danger',
          alertMessage: msg
        });
      }
    );
  };

  getAlertMessage = () =>
    this.state.alertMessage.map(msg => <p key={msg}>{msg}</p>);

  handleInsertedRow = row => {
    const newRow = {
      name: row.name,
      vintage: parseInt(row.vintage, 10),
      varietal: row.varietal,
      vineyard: row.vineyard,
      color: row.color
    };

    insertBottle(
      this.props.accountSelection.id,
      newRow,
      this.props.dispatch,
      () => {
        const msg = [];
        msg.push('Successfully Added');
        this.setState({
          alertVisible: true,
          alertType: 'success',
          alertMessage: msg
        });
      },
      error => {
        const msg = [];
        msg.push('Unable to complete the requested action.');
        if (error && error.response && error.response.data) {
          msg.push(error.response.data);
        }
        this.setState({
          alertVisible: true,
          alertType: 'danger',
          alertMessage: msg
        });
      }
    );
  };

  handleAlertDismiss() {
    this.setState({ alertMessage: [], alertVisible: false });
  }

  render() {
    const alert = this.getAlertMessage();
    const data = this.props.bottles.data ? this.props.bottles.data : [];

    return (
      <div>
        {this.state.alertVisible &&
          <div style={{ margin: '0px 10px 0px 10px' }}>
            <Alert
              bsStyle={this.state.alertType}
              onDismiss={this.handleAlertDismiss.bind(this)}
            >
              {alert}
            </Alert>
          </div>}
        {this.props.bottles.isLoading && <div>Loading...</div>}
        {!this.props.bottles.isLoading &&
          this.props.accountSelection.id !== 0 &&
          <div>
            <Well style={{ margin: '0px 10px 20px 10px' }}>
              <h1 style={{ textAlign: 'center' }}>
                &nbsp;Bottles for account
                {' '}
                {this.props.accountSelection.id}
                :
                {' '}
                {this.props.accountSelection.name}
              </h1>
            </Well>
            <BootstrapTable
              data={data}
              striped
              selectRow={selectRowProp}
              deleteRow
              hover
              search
              multiColumnSearch
              insertRow
              options={{
                clearSearch: true,
                afterInsertRow: this.handleInsertedRow.bind(this),
                onDeleteRow: this.onDeleteRow.bind(this),
                defaultSortName: 'id', // default sort column name
                defaultSortOrder: 'asc' // default sort order
              }}
              cellEdit={{
                blurToSave: true,
                mode: 'dbclick',
                afterSaveCell: this.onAfterSaveCell.bind(this) // a hook for after saving cell
              }}
            >
              <TableHeaderColumn
                dataField="id"
                isKey
                dataAlign="center"
                hiddenOnInsert
                dataSort
                width="80px"
                autoValue
              >
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort editable>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="vineyard" dataSort editable>
                Vineyard
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="varietal"
                tdStyle={{ whiteSpace: 'normal' }}
                dataSort
                editable
              >
                Varietal
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="vintage"
                dataSort
                width="90px"
                editable
              >
                Vintage
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="rating"
                hidden
                hiddenOnInsert
                dataSort
                editable
              >
                Rating
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="color"
                hidden
                dataSort
                editable={{ type: 'select', options: { values: colorOptions } }}
              >
                Color
              </TableHeaderColumn>
            </BootstrapTable>
          </div>}
      </div>
    );
  }
}

export default BottlesTable;
