import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Alert, Well } from 'react-bootstrap';
import { insertAccount, editAccount, removeAccount } from '../manageAccounts';
import { selectAccount } from '../redux/accountSelection';

class AccountsTable extends Component {
  static propTypes = {
    accounts: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      filtersOn: false,
      selectedRow: [],
      isActive: false,
      alertMessage: [],
      alertType: 'info',
      alertVisible: false
    };
    this.selectRowProp = {
      mode: 'radio',
      onSelect: this.onRowSelect.bind(this)
    };
  }

  onAfterSaveCell = row => {
    editAccount(
      row,
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
  };

  onDeleteRow = rowids => {
    removeAccount(
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

  onRowSelect = row => {
    if (row) {
      this.props.dispatch(selectAccount(row.id, row.name));
    }
    this.setState({ selectedRow: row });
  };

  getAlertMessage = () => (
      this.state.alertMessage.map(msg => <p key={msg}>{msg}</p>)
  );

  handleInsertedRow = row => {
    const newRow = {
      name: row.name
    };
    insertAccount(
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
    this.setState({ alertMessage: null, alertVisible: false });
  }

  render() {
    const data = this.props.accounts.data ? this.props.accounts.data : [];
    const alert = this.getAlertMessage();
    const cellEditProp = {
      blurToSave: true,
      mode: 'dbclick',
      beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: this.onAfterSaveCell // a hook for after saving cell
    };
    const gridOptions = {
      clearSearch: true,
      afterInsertRow: this.handleInsertedRow,
      onDeleteRow: this.onDeleteRow,
      defaultSortName: 'id', // default sort column name
      defaultSortOrder: 'asc', // default sort order
    };

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
        {this.props.accounts.isLoading &&
          <div>Loading...</div>}
        {!this.props.accounts.isLoading &&
          <div>
            <Well style={{ margin: '0px 10px 20px 10px' }}>
              <h1 style={{ textAlign: 'center' }}>
                &nbsp;Accounts
              </h1>
            </Well>
            <BootstrapTable
              data={data}
              striped
              selectRow={this.selectRowProp}
              deleteRow
              hover
              search
              multiColumnSearch
              insertRow
              options={gridOptions}
              cellEdit={cellEditProp}
            >
              <TableHeaderColumn
                dataField="id"
                isKey
                dataAlign="center"
                hiddenOnInsert
                dataSort
                editable={false}
                width="80px"
                autoValue
              >
                ID
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort editable>
                Name
              </TableHeaderColumn>
            </BootstrapTable>
          </div>}
      </div>
    );
  }
}

export default AccountsTable;
