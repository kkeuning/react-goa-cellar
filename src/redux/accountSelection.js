const initialState = {
  id: 0,
  name: '(No Account Selected)'
};

const CLEAR_ACCOUNT_SELECTION = 'CLEAR_ACCOUNT_SELECTION';
const SELECT_ACCOUNT = 'SELECT_ACCOUNT';

export const clearAccountSelection = () => ({
  type: CLEAR_ACCOUNT_SELECTION
});

export const selectAccount = (id, name) => ({
  type: SELECT_ACCOUNT,
  data: { id, name }
});

const accountSelection = (state = initialState, action = null) => {
  switch (action.type) {
    case SELECT_ACCOUNT:
      return {
        ...state,
        ...action.data
      };
    case CLEAR_ACCOUNT_SELECTION:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default accountSelection;
