import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from 'redux/modules/index';

// Middleware you want to use in production:
const enhancer = compose(applyMiddleware(thunk));

const configureStore = (initialState: Object = {}) => {
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
};

export default configureStore;
