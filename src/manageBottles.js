import * as bottles from './redux/reduxa/cellar/bottleActionCreators';
import { cellarAPIServer } from './config';

export const loadBottles = (
  accountID,
  dispatch,
  handleSuccess,
  handleError
) => {
  const options = { params: { time: `${Date.now()}` } };
  dispatch(
    bottles.listBottles(
      `${cellarAPIServer()}/cellar/accounts/${accountID}/bottles`,
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

export const insertBottle = (
  accountID,
  data,
  dispatch,
  handleSuccess,
  handleError
) => {
  dispatch(
    bottles.createBottle(
      `${cellarAPIServer()}/cellar/accounts/${accountID}/bottles`,
      {},
      data,
      response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
        loadBottles(accountID, dispatch);
      },
      error => {
        if (handleError) {
          handleError(error);
        }
        loadBottles(accountID, dispatch);
      }
    )
  );
};

export const removeBottle = (
  accountID,
  bottleID,
  dispatch,
  handleSuccess,
  handleError
) => {
  dispatch(
    bottles.deleteBottle(
      `${cellarAPIServer()}/cellar/accounts/${accountID}/bottles/${bottleID}`,
      {},
      response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
        loadBottles(accountID, dispatch);
      },
      error => {
        if (handleError) {
          handleError(error);
        }
        loadBottles(accountID, dispatch);
      }
    )
  );
};

export const editBottle = (
  accountID,
  data,
  dispatch,
  handleSuccess,
  handleError
) => {
  const bottleID = data.id;
  dispatch(
    bottles.updateBottle(
      `${cellarAPIServer()}/cellar/accounts/${accountID}/bottles/${bottleID}`,
      {},
      data,
      response => {
        if (handleSuccess) {
          handleSuccess(response);
        }
        loadBottles(accountID, dispatch);
      },
      error => {
        if (handleError) {
          handleError(error);
        }
        loadBottles(accountID, dispatch);
      }
    )
  );
};
