import * as types from './reduxa/cellar/bottleActionTypes';

const CLEAR_BOTTLES = 'CLEAR_BOTTLES';

const initialState = {
  isLoading: true,
  error: false,
  status: false,
  data: []
};

const bottles = (state = initialState, action = null) => {
  switch (action.type) {
    case types.RCV_LIST_BOTTLES_ERROR:
      return {
        ...state,
        isLoading: false,
        status: action.status,
        error: true
      };
    case CLEAR_BOTTLES:
      return initialState;
    case types.RCV_LIST_BOTTLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        status: false,
        data: action.data,
        error: false
      };
    case types.REQ_LIST_BOTTLES:
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

export default bottles;
