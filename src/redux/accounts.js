import * as types from './reduxa/cellar/accountActionTypes';

const CLEAR_ACCOUNTS = 'CLEAR_ACCOUNTS';

const initialState = {
  isLoading: true,
  error: false,
  status: false,
  data: null
};

const accounts = (state = initialState, action = null) => {
  switch (action.type) {
    case types.RCV_LIST_ACCOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        error: true
      };
    case CLEAR_ACCOUNTS:
      return initialState;
    case types.RCV_LIST_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: false,
        data: action.data,
        error: false
      };
    case types.REQ_LIST_ACCOUNTS:
      return {
        ...state,
        isLoading: true,
        status: false,
        error: false,
        data: false
      };
    default:
      return state;
  }
};

export default accounts;
