import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import accounts from './accounts';
import bottles from './bottles';
import accountSelection from './accountSelection';

const getCreateStore = () => (
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)
);

const reducer = combineReducers({
  accounts,
  bottles,
  accountSelection
});

const store = getCreateStore()(reducer);

export default store;
