import * as accounts from './redux/reduxa/cellar/accountActionCreators';
import { cellarAPIServer } from './config';

export const loadAccounts = (dispatch, handleSuccess, handleError) => {
  const options = { params: { time: `${Date.now()}` } };
  dispatch(
    accounts.listAccounts(
      `${cellarAPIServer()}/cellar/accounts`,
      options,
      response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
      },
      error => {
        if (handleError) {
          handleError(error);
        }
      }
    )
  );
};

export const insertAccount = (data, dispatch, handleSuccess, handleError) => {
  dispatch(
    accounts.createAccount(
      `${cellarAPIServer()}/cellar/accounts`,
      {},
      data,
      response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
        loadAccounts(dispatch);
      },
      error => {
        if (handleError) {
          handleError(error);
        }
        loadAccounts(dispatch);
      }
    )
  );
};

export const removeAccount = (
  accountID,
  dispatch,
  handleSuccess,
  handleError
) => {
  dispatch(
    accounts.deleteAccount(
      `${cellarAPIServer()}/cellar/accounts/${accountID}`,
      {},
      response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
        loadAccounts(dispatch);
      },
      error => {
        if (handleError) {
          handleError(error);
        }
        loadAccounts(dispatch);
      }
    )
  );
};

export const editAccount = (data, dispatch, handleSuccess, handleError) => {
  const accountID = data.id;
  dispatch(
    accounts.updateAccount(
      `${cellarAPIServer()}/cellar/accounts/${accountID}`,
      {},
      data,
      response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
      },
      () => {
        loadAccounts(dispatch);
      },
      error => {
        if (handleError) {
          handleError(error);
        }
        loadAccounts(dispatch);
      }
    )
  );
};
